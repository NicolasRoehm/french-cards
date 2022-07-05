// Angular modules
import { NgModule }          from '@angular/core';
import { Routes }            from '@angular/router';
import { RouterModule }      from '@angular/router';

// Components
import { NotFoundComponent } from './static/not-found/not-found.component';

const routes : Routes = [
  {
    path         : 'home',
    loadChildren : () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad      : [ ],
  },
  {
    path         : 'card',
    loadChildren : () => import('./pages/card/card.module').then(m => m.CardModule),
    canLoad      : [ ],
  },
  {
    path         : 'scan',
    loadChildren : () => import('./pages/scan/scan.module').then(m => m.ScanModule),
    canLoad      : [ ],
  },
  { path : '',   redirectTo : '/home', pathMatch : 'full' },
  { path : '**', component : NotFoundComponent }
];

@NgModule({
  imports : [RouterModule.forRoot(routes, { relativeLinkResolution : 'legacy', onSameUrlNavigation : 'reload' })],
  exports : [RouterModule]
})
export class AppRoutingModule { }
