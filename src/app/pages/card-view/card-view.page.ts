import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';

import { CardStore } from '../../core/card-store';
import { ToastService } from '../../core/toast.service';
import { BarcodeComponent } from '../../ui/barcode/barcode.component';
import { readableText } from '../../ui/color';

/** Carte en plein écran, luminosité au maximum le temps du passage en caisse. */
@Component({
  selector: 'app-card-view-page',
  imports: [RouterLink, BarcodeComponent],
  templateUrl: './card-view.page.html',
  styleUrl: './card-view.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardViewPage implements OnInit, OnDestroy {
  readonly id = input.required<string>();

  private readonly store = inject(CardStore);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly card = computed(() => this.store.get(this.id()));
  protected readonly ink = computed(() => readableText(this.card()?.color ?? '#12277f'));

  ngOnInit(): void {
    if (!this.card()) {
      void this.router.navigate(['/']);
      return;
    }
    void this.store.markUsed(this.id());
    void this.setBrightness(1);
  }

  ngOnDestroy(): void {
    void this.setBrightness(-1);
  }

  protected async remove(): Promise<void> {
    const card = this.card();
    if (!card || !confirm(`Supprimer la carte « ${card.name} » ?`)) return;
    await this.store.remove(card.id);
    this.toast.show('Carte supprimée', 'success');
    await this.router.navigate(['/'], { replaceUrl: true });
  }

  private async setBrightness(brightness: number): Promise<void> {
    if (Capacitor.isNativePlatform()) await ScreenBrightness.setBrightness({ brightness }).catch(() => undefined);
  }
}
