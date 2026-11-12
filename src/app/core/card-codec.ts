import { Card, CardInput, PALETTE, normalizeFormat } from './card.model';

/** Préfixe du QR code de transfert entre téléphones. */
export const TRANSFER_PREFIX = 'FC1:';

type CompactCard = [name: string, value: string, format: string, color: string];

// ---------------------------------------------------------------------------
// Fichier de sauvegarde (JSON lisible)
// ---------------------------------------------------------------------------

export function toBackupJson(cards: Card[]): string {
  const payload = {
    app: 'french-cards',
    version: 2,
    exportedAt: new Date().toISOString(),
    cards: cards.map(({ name, value, format, color }) => ({ name, value, format, color })),
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Lit tout ce qu'on peut coller ou importer : QR de transfert, sauvegarde v2,
 * ou export de l'ancienne app (tableau de { id, name, hexColor, format }).
 */
export async function parseCards(text: string): Promise<CardInput[]> {
  const raw = text.trim();
  if (raw.startsWith(TRANSFER_PREFIX)) return decodeTransfer(raw);

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error('Ce contenu n’est pas un export French Cards.');
  }
  const items = Array.isArray(data) ? data : (data as { cards?: unknown[] })?.cards;
  if (!Array.isArray(items)) throw new Error('Aucune carte trouvée dans ce contenu.');

  return items.map(parseLegacyCard).filter((card): card is CardInput => card !== null);
}

/** Accepte le format v2 ({ value, color }) comme l'ancien ({ id, hexColor }). */
export function parseLegacyCard(item: unknown): CardInput | null {
  if (!item || typeof item !== 'object') return null;
  const record = item as Record<string, unknown>;
  const value = String(record['value'] ?? record['id'] ?? '').trim();
  if (!value) return null;
  return {
    value,
    name: String(record['name'] ?? '').trim() || 'Carte',
    format: normalizeFormat(record['format'] as string),
    color: String(record['color'] ?? record['hexColor'] ?? '') || PALETTE[0],
  };
}

// ---------------------------------------------------------------------------
// QR code de transfert : JSON compact, compressé (deflate) puis base64url
// ---------------------------------------------------------------------------

export async function encodeTransfer(cards: Card[]): Promise<string> {
  const compact: CompactCard[] = cards.map((c) => [c.name, c.value, c.format, c.color]);
  const bytes = await pipeThrough(new TextEncoder().encode(JSON.stringify(compact)), new CompressionStream('deflate-raw'));
  return TRANSFER_PREFIX + toBase64Url(bytes);
}

async function decodeTransfer(text: string): Promise<CardInput[]> {
  try {
    const bytes = await pipeThrough(fromBase64Url(text.slice(TRANSFER_PREFIX.length)), new DecompressionStream('deflate-raw'));
    const compact = JSON.parse(new TextDecoder().decode(bytes)) as CompactCard[];
    return compact.map(([name, value, format, color]) => ({ name, value, format, color }));
  } catch {
    throw new Error('QR code de transfert illisible.');
  }
}

async function pipeThrough(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const piped = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(piped).arrayBuffer());
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(text: string): Uint8Array {
  const binary = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
