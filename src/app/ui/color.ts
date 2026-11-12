/** Texte noir ou blanc selon la luminance de la couleur de fond. */
export function readableText(hex: string): string {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return '#fff';
  const [r, g, b] = match.slice(1).map((part) => parseInt(part, 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.6 ? '#111827' : '#fff';
}
