import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Card } from '../../core/card.model';
import { readableText } from '../color';

/** Vignette d'une carte dans la liste : un tap ouvre le code en plein écran. */
@Component({
  selector: 'app-card-tile',
  imports: [RouterLink],
  template: `
    <a class="tile" [routerLink]="['/card', card().id]" [style.--card]="card().color" [style.color]="ink()">
      <span class="initial" aria-hidden="true">{{ initial() }}</span>
      <span class="name">{{ card().name }}</span>
    </a>
  `,
  styleUrl: './card-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTileComponent {
  readonly card = input.required<Card>();
  protected readonly ink = computed(() => readableText(this.card().color));
  protected readonly initial = computed(() => this.card().name.charAt(0).toUpperCase());
}
