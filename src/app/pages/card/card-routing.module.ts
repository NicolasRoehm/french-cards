// Angular modules
import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes }        from '@angular/router';

// Components
import { CardComponent } from './card.component';

const routes: Routes = [
  { path : '', component : CardComponent },
];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class CardRoutingModule { }
