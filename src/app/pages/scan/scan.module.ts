// Angular modules
import { CommonModule }      from '@angular/common';
import { NgModule }          from '@angular/core';

// Internal modules
import { ScanRoutingModule } from './scan-routing.module';
import { SharedModule }      from '../../shared/shared.module';

// Components
import { ScanComponent }     from './scan.component';

@NgModule({
  declarations: [
    ScanComponent
  ],
  imports: [
    CommonModule,
    ScanRoutingModule,
    SharedModule
  ]
})
export class ScanModule { }
