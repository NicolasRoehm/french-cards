import { Injectable, computed, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { Card, CardInput, createCard } from './card.model';
import { parseLegacyCard } from './card-codec';

const STORAGE_KEY = 'french-cards.v2';
/** Clés de l'ancienne app (Capacitor Storage) : FrenchCards_Card_<numéro>. */
const LEGACY_PREFIX = 'FrenchCards_Card_';

export interface ImportResult {
  added: number;
  skipped: number;
}

@Injectable({ providedIn: 'root' })
export class CardStore {
  private readonly state = signal<Card[]>([]);

  /** Les cartes utilisées récemment d'abord, puis par nom. */
  readonly cards = computed(() =>
    [...this.state()].sort((a, b) => b.usedAt - a.usedAt || a.name.localeCompare(b.name, 'fr')),
  );

  async load(): Promise<void> {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    this.state.set(value ? (JSON.parse(value) as Card[]) : []);
    await this.migrateLegacy();
  }

  get(id: string): Card | undefined {
    return this.state().find((card) => card.id === id);
  }

  async add(input: CardInput): Promise<Card> {
    const card = createCard(input);
    await this.save([...this.state(), card]);
    return card;
  }

  async update(id: string, input: CardInput): Promise<void> {
    await this.save(this.state().map((card) => (card.id === id ? { ...card, ...input } : card)));
  }

  async remove(id: string): Promise<void> {
    await this.save(this.state().filter((card) => card.id !== id));
  }

  async markUsed(id: string): Promise<void> {
    await this.save(this.state().map((card) => (card.id === id ? { ...card, usedAt: Date.now() } : card)));
  }

  /** Ajoute les cartes inconnues ; une carte dont le numéro existe déjà est ignorée. */
  async importMany(inputs: CardInput[]): Promise<ImportResult> {
    const known = new Set(this.state().map((card) => card.value));
    const fresh: Card[] = [];
    for (const input of inputs) {
      if (known.has(input.value)) continue;
      known.add(input.value);
      fresh.push(createCard(input));
    }
    if (fresh.length) await this.save([...this.state(), ...fresh]);
    return { added: fresh.length, skipped: inputs.length - fresh.length };
  }

  private async save(cards: Card[]): Promise<void> {
    this.state.set(cards);
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(cards) });
  }

  private async migrateLegacy(): Promise<void> {
    const { keys } = await Preferences.keys();
    const legacyKeys = keys.filter((key) => key.startsWith(LEGACY_PREFIX));
    if (!legacyKeys.length) return;

    const inputs: CardInput[] = [];
    for (const key of legacyKeys) {
      const { value } = await Preferences.get({ key });
      const card = value ? parseLegacyCard(JSON.parse(value)) : null;
      if (card) inputs.push(card);
    }
    await this.importMany(inputs);
    await Promise.all(legacyKeys.map((key) => Preferences.remove({ key })));
  }
}
