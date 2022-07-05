// Angular modules
import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes }        from '@angular/router';

// Components
import { ScanComponent } from './scan.component';

const routes: Routes = [
  { path : '', component : ScanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanRoutingModule { }
