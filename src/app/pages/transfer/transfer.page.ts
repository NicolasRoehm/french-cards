import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

import { AddCardFlow } from '../../core/add-card.flow';
import { CardStore } from '../../core/card-store';
import { encodeTransfer, toBackupJson } from '../../core/card-codec';
import { ToastService } from '../../core/toast.service';
import { BarcodeComponent } from '../../ui/barcode/barcode.component';
import { TopBarComponent } from '../../ui/top-bar/top-bar.component';

/** Au-delà, le QR code devient trop dense pour être scanné de façon fiable. */
const MAX_QR_LENGTH = 2000;

type Tab = 'receive' | 'send';

@Component({
  selector: 'app-transfer-page',
  imports: [BarcodeComponent, TopBarComponent],
  templateUrl: './transfer.page.html',
  styleUrl: './transfer.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferPage {
  protected readonly store = inject(CardStore);
  protected readonly flow = inject(AddCardFlow);
  private readonly toast = inject(ToastService);

  protected readonly tab = signal<Tab>(this.store.cards().length ? 'send' : 'receive');
  protected readonly pasted = signal('');
  protected readonly maxQrLength = MAX_QR_LENGTH;

  /** Toutes les cartes compressées dans un seul QR code. */
  protected readonly payload = resource({
    params: () => this.store.cards(),
    loader: ({ params }) => encodeTransfer(params),
  });

  protected async shareFile(): Promise<void> {
    const json = toBackupJson(this.store.cards());
    const fileName = `french-cards-${new Date().toISOString().slice(0, 10)}.json`;
    try {
      if (!Capacitor.isNativePlatform()) {
        this.download(json, fileName);
        return;
      }
      const { uri } = await Filesystem.writeFile({ path: fileName, data: json, directory: Directory.Cache, encoding: Encoding.UTF8 });
      await Share.share({ title: 'Mes cartes French Cards', files: [uri] });
    } catch (error) {
      if (!String(error).toLowerCase().includes('cancel')) this.toast.error(error);
    }
  }

  protected async pasteClipboard(): Promise<void> {
    try {
      const { value } = await Clipboard.read();
      if (!value?.trim()) {
        this.toast.show('Le presse-papiers est vide.', 'error');
        return;
      }
      await this.flow.importText(value);
    } catch (error) {
      this.toast.error(error);
    }
  }

  protected async importPasted(): Promise<void> {
    try {
      await this.flow.importText(this.pasted());
    } catch (error) {
      this.toast.error(error);
    }
  }

  protected async importFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      await this.flow.importText(await file.text());
    } catch (error) {
      this.toast.error(error);
    }
  }

  protected text(event: Event): string {
    return (event.target as HTMLTextAreaElement).value;
  }

  private download(content: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
