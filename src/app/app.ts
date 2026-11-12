import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastService } from './core/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
    <div class="toasts" aria-live="polite">
      @for (item of toast.toasts(); track item.id) {
        <button type="button" class="toast" [class.success]="item.kind === 'success'" [class.error]="item.kind === 'error'" (click)="toast.dismiss(item.id)">{{ item.text }}</button>
      }
    </div>
  `,
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly toast = inject(ToastService);
}
