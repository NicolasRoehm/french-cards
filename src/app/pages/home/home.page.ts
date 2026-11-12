import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AddCardFlow } from '../../core/add-card.flow';
import { CardStore } from '../../core/card-store';
import { CardTileComponent } from '../../ui/card-tile/card-tile.component';
import { TopBarComponent } from '../../ui/top-bar/top-bar.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CardTileComponent, TopBarComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly store = inject(CardStore);
  protected readonly flow = inject(AddCardFlow);
  protected readonly query = signal('');

  protected readonly visible = computed(() => {
    const query = this.query().trim().toLocaleLowerCase('fr');
    const cards = this.store.cards();
    return query ? cards.filter((card) => card.name.toLocaleLowerCase('fr').includes(query)) : cards;
  });
}
