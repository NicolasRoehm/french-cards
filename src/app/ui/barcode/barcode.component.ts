import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { toSVG } from 'bwip-js/browser';

import { bcidOf, isMatrixFormat } from '../../core/card.model';

/** Rend n'importe quel code-barres ou QR code en SVG (bwip-js). */
@Component({
  selector: 'app-barcode',
  template: `
    @if (svg(); as markup) {
      <div class="barcode" [class.matrix]="matrix()" [innerHTML]="markup"></div>
    } @else {
      <p class="error">Code illisible pour ce format.<br /><strong>{{ value() }}</strong></p>
    }
  `,
  styleUrl: './barcode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarcodeComponent {
  readonly value = input.required<string>();
  readonly format = input.required<string>();
  readonly showText = input(true);

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly matrix = computed(() => isMatrixFormat(this.format()));

  protected readonly svg = computed(() => {
    const bcid = bcidOf(this.format());
    const matrix = this.matrix();
    try {
      const markup = toSVG({
        bcid,
        text: this.value(),
        scale: 3,
        height: matrix ? undefined : 22,
        includetext: !matrix && this.showText(),
        textxalign: 'center',
        textsize: 11,
        paddingwidth: matrix ? 2 : 6,
        paddingheight: 2,
      });
      return this.sanitizer.bypassSecurityTrustHtml(markup);
    } catch {
      // Valeur incompatible avec le format (checksum EAN…) : on retente en Code 128.
      if (bcid === 'code128') return null;
      try {
        return this.sanitizer.bypassSecurityTrustHtml(
          toSVG({ bcid: 'code128', text: this.value(), scale: 3, height: 22, includetext: this.showText(), textxalign: 'center' }),
        );
      } catch {
        return null;
      }
    }
  });
}
