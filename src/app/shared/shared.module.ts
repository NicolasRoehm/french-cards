// Angular modules
import { CommonModule }               from '@angular/common';
import { NgModule }                   from '@angular/core';
import { FormsModule }                from '@angular/forms';
import { ReactiveFormsModule }        from '@angular/forms';
import { RouterModule }               from '@angular/router';

// External modules
import { TranslateModule }            from '@ngx-translate/core';
import { AngularSvgIconModule }       from 'angular-svg-icon';
import { NgbModule }                  from '@ng-bootstrap/ng-bootstrap';
import { NgxBarcodeModule }           from 'ngx-barcode';

// Components
import { BackBtnComponent }           from './components/blocks/back-btn/back-btn.component';
import { HeaderBlockComponent }       from './components/blocks/header-block/header-block.component';
import { CardBlockComponent }         from './components/blocks/card-block/card-block.component';
import { NavBlockComponent }          from './components/blocks/nav-block/nav-block.component';
import { ToastComponent }             from './components/blocks/toast/toast.component';
import { ProgressBarComponent }       from './components/blocks/progress-bar/progress-bar.component';

// Layouts
import { LayoutHeaderComponent }     from './components/layouts/layout-header/layout-header.component';
import { PageLayoutComponent }       from './components/layouts/page-layout/page-layout.component';

@NgModule({
  imports         :
  [
    // Angular modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // External modules
    TranslateModule,
    AngularSvgIconModule,
    NgbModule,
    NgxBarcodeModule
  ],
  declarations    :
  [
    // Components
    BackBtnComponent,
    HeaderBlockComponent,
    CardBlockComponent,
    NavBlockComponent,
    ToastComponent,
    ProgressBarComponent,

    // Layouts
    LayoutHeaderComponent,
    PageLayoutComponent,

    // Pipes

    // Directives
  ],
  exports         :
  [
    // Angular modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // External modules
    TranslateModule,
    AngularSvgIconModule,
    NgbModule,
    NgxBarcodeModule,

    // Components
    BackBtnComponent,
    HeaderBlockComponent,
    CardBlockComponent,
    NavBlockComponent,
    ToastComponent,
    ProgressBarComponent,

    // Layouts
    LayoutHeaderComponent,
    PageLayoutComponent,

    // Pipes

    // Directives
  ],
  providers       :
  [
  ]
})
export class SharedModule {}
