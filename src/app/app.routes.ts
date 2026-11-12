import { Routes } from '@angular/router';

import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'card/new', loadComponent: () => import('./pages/card-form/card-form.page').then((m) => m.CardFormPage) },
  { path: 'card/:id', loadComponent: () => import('./pages/card-view/card-view.page').then((m) => m.CardViewPage) },
  { path: 'card/:id/edit', loadComponent: () => import('./pages/card-form/card-form.page').then((m) => m.CardFormPage) },
  { path: 'transfer', loadComponent: () => import('./pages/transfer/transfer.page').then((m) => m.TransferPage) },
  { path: '**', redirectTo: '' },
];
