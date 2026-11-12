import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CardStore } from '../../core/card-store';
import { FORMAT_OPTIONS, PALETTE, normalizeFormat } from '../../core/card.model';
import { scanCode } from '../../core/scanner';
import { ToastService } from '../../core/toast.service';
import { BarcodeComponent } from '../../ui/barcode/barcode.component';
import { TopBarComponent } from '../../ui/top-bar/top-bar.component';
import { readableText } from '../../ui/color';

/** Ajout (après un scan ou à la main) et modification d'une carte, avec aperçu en direct. */
@Component({
  selector: 'app-card-form-page',
  imports: [BarcodeComponent, TopBarComponent],
  templateUrl: './card-form.page.html',
  styleUrl: './card-form.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFormPage implements OnInit {
  /** Paramètres de route / query params (withComponentInputBinding). */
  readonly id = input<string>();
  readonly value = input<string>();
  readonly format = input<string>();

  private readonly store = inject(CardStore);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly palette = PALETTE;
  protected readonly formats = FORMAT_OPTIONS;

  protected readonly name = signal('');
  protected readonly number = signal('');
  protected readonly codeFormat = signal('CODE128');
  protected readonly color = signal(PALETTE[0]);
  protected readonly saving = signal(false);

  protected readonly editing = computed(() => !!this.id());
  protected readonly ink = computed(() => readableText(this.color()));
  protected readonly canSave = computed(() => !!this.name().trim() && !!this.number().trim() && !this.saving());
  protected readonly knownFormat = computed(() => this.formats.some((option) => option.value === this.codeFormat()));

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      const card = this.store.get(id);
      if (!card) {
        void this.router.navigate(['/']);
        return;
      }
      this.name.set(card.name);
      this.number.set(card.value);
      this.codeFormat.set(card.format);
      this.color.set(card.color);
      return;
    }
    this.number.set(this.value() ?? '');
    this.codeFormat.set(normalizeFormat(this.format()));
    this.color.set(PALETTE[this.store.cards().length % PALETTE.length]);
  }

  protected async rescan(): Promise<void> {
    try {
      const code = await scanCode();
      if (!code) return;
      this.number.set(code.value);
      this.codeFormat.set(normalizeFormat(code.format));
    } catch (error) {
      this.toast.error(error);
    }
  }

  protected async save(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.canSave()) return;
    this.saving.set(true);
    const input = { name: this.name(), value: this.number().trim(), format: this.codeFormat(), color: this.color() };
    const id = this.id();
    if (id) {
      await this.store.update(id, input);
      this.toast.show('Carte modifiée', 'success');
      await this.router.navigate(['/card', id], { replaceUrl: true });
      return;
    }
    const card = await this.store.add(input);
    this.toast.show('Carte ajoutée', 'success');
    await this.router.navigate(['/card', card.id], { replaceUrl: true });
  }

  protected text(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
