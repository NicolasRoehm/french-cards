import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Location } from '@angular/common';
import { inject } from '@angular/core';

/** Barre du haut : retour optionnel, titre, actions projetées à droite. */
@Component({
  selector: 'app-top-bar',
  template: `
    <header class="bar">
      @if (back()) {
        <button type="button" class="icon" aria-label="Retour" (click)="location.back()">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      }
      <h1>{{ title() }}</h1>
      <ng-content />
    </header>
  `,
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  readonly title = input.required<string>();
  readonly back = input(false);
  protected readonly location = inject(Location);
}
