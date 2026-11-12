export interface Card {
  id: string;
  name: string;
  /** Contenu du code-barres (numéro de carte). */
  value: string;
  /** Format normalisé : CODE128, EAN13, QRCODE… */
  format: string;
  color: string;
  createdAt: number;
  usedAt: number;
}

export type CardInput = Pick<Card, 'name' | 'value' | 'format' | 'color'>;

/** Format normalisé → identifiant bwip-js. Couvre les formats ML Kit et ceux de l'ancienne app. */
const BCID: Record<string, string> = {
  CODE128: 'code128', CODE128A: 'code128', CODE128B: 'code128', CODE128C: 'code128',
  EAN13: 'ean13', EAN: 'ean13', EAN8: 'ean8', EAN5: 'ean5', EAN2: 'ean2',
  UPC: 'upca', UPCA: 'upca', UPCE: 'upce',
  CODE39: 'code39', CODE93: 'code93',
  ITF: 'interleaved2of5', ITF14: 'itf14',
  MSI: 'msi', CODABAR: 'rationalizedCodabar', PHARMACODE: 'pharmacode',
  QRCODE: 'qrcode', DATAMATRIX: 'datamatrix', PDF417: 'pdf417', AZTEC: 'azteccode',
};

export const FORMAT_OPTIONS: { value: string; label: string }[] = [
  { value: 'CODE128', label: 'Code 128 (le plus courant)' },
  { value: 'EAN13', label: 'EAN-13 (13 chiffres)' },
  { value: 'EAN8', label: 'EAN-8 (8 chiffres)' },
  { value: 'UPCA', label: 'UPC-A' },
  { value: 'CODE39', label: 'Code 39' },
  { value: 'ITF', label: 'ITF' },
  { value: 'QRCODE', label: 'QR code' },
  { value: 'DATAMATRIX', label: 'Data Matrix' },
  { value: 'PDF417', label: 'PDF417' },
  { value: 'AZTEC', label: 'Aztec' },
];

export const PALETTE = [
  '#12277f', '#0b5cff', '#0891b2', '#0f9d58', '#65a30d', '#f5b700',
  '#f97316', '#e11d48', '#c026d3', '#6d28d9', '#475569', '#111827',
];

export function normalizeFormat(format?: string | null): string {
  const normalized = (format ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return normalized || 'CODE128';
}

export function bcidOf(format: string): string {
  return BCID[normalizeFormat(format)] ?? 'code128';
}

export function isMatrixFormat(format: string): boolean {
  return ['qrcode', 'datamatrix', 'azteccode', 'pdf417'].includes(bcidOf(format));
}

export function createCard(input: CardInput): Card {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    value: input.value.trim(),
    format: normalizeFormat(input.format),
    color: input.color || PALETTE[0],
    createdAt: now,
    usedAt: 0,
  };
}
