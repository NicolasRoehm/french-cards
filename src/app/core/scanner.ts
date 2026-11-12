import { Capacitor } from '@capacitor/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

export interface ScannedCode {
  value: string;
  format: string;
}

/**
 * Ouvre le scanner Google (aucune permission caméra à demander).
 * Renvoie null si l'utilisateur annule.
 */
export async function scanCode(): Promise<ScannedCode | null> {
  if (!Capacitor.isNativePlatform()) {
    throw new Error('Le scan n’est disponible que dans l’app Android.');
  }

  const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
  if (!available) {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
    throw new Error('Installation du scanner Google en cours… réessaie dans quelques secondes.');
  }

  try {
    const { barcodes } = await BarcodeScanner.scan();
    const [barcode] = barcodes;
    if (!barcode) return null;
    return { value: barcode.rawValue ?? barcode.displayValue, format: barcode.format };
  } catch (error) {
    if (String((error as Error)?.message ?? error).toLowerCase().includes('cancel')) return null;
    throw error;
  }
}
