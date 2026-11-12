import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardStore } from './card-store';
import { TRANSFER_PREFIX, parseCards } from './card-codec';
import { scanCode } from './scanner';
import { ToastService } from './toast.service';

/** Un seul point d'entrée pour « scanner » : carte de fidélité ou QR de transfert. */
@Injectable({ providedIn: 'root' })
export class AddCardFlow {
  private readonly router = inject(Router);
  private readonly store = inject(CardStore);
  private readonly toast = inject(ToastService);

  async scan(): Promise<void> {
    try {
      const code = await scanCode();
      if (!code) return;
      if (code.value.startsWith(TRANSFER_PREFIX)) {
        await this.importText(code.value);
        return;
      }
      await this.router.navigate(['/card/new'], { queryParams: { value: code.value, format: code.format } });
    } catch (error) {
      this.toast.error(error);
    }
  }

  async importText(text: string): Promise<void> {
    const { added, skipped } = await this.store.importMany(await parseCards(text));
    const ignored = skipped ? ` (${skipped} déjà présente${skipped > 1 ? 's' : ''})` : '';
    this.toast.show(`${added} carte${added > 1 ? 's' : ''} importée${added > 1 ? 's' : ''}${ignored}`, 'success');
    await this.router.navigate(['/']);
  }
}
