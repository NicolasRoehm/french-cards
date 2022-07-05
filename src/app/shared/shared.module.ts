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
import { ColorPickerModule }          from 'ngx-color-picker';

// Components
import { BackBtnComponent }           from '@blocks/back-btn/back-btn.component';
import { CardBlockComponent }         from '@blocks/card-block/card-block.component';
import { NavBlockComponent }          from '@blocks/nav-block/nav-block.component';
import { ToastComponent }             from '@blocks/toast/toast.component';
import { ProgressBarComponent }       from '@blocks/progress-bar/progress-bar.component';

// Forms
import { ExportFormComponent }        from '@forms/export-form/export-form.component';
import { ImportFormComponent }        from '@forms/import-form/import-form.component';
import { CardFormComponent }          from '@forms/card-form/card-form.component';
import { FormConfirmComponent }       from '@forms/form-confirm/form-confirm.component';

// Layouts
import { LayoutHeaderComponent }      from '@layouts/layout-header/layout-header.component';
import { PageLayoutComponent }        from '@layouts/page-layout/page-layout.component';

// Modals
import { ModalWrapperComponent }      from '@modals/modal-wrapper/modal-wrapper.component';

// Directives
import { ModalWrapperDirective }     from '@directives/modal-wrapper.directive';

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
    NgxBarcodeModule,
    ColorPickerModule,
  ],
  declarations    :
  [
    // Components
    BackBtnComponent,
    CardBlockComponent,
    NavBlockComponent,
    ToastComponent,
    ProgressBarComponent,

    // Layouts
    LayoutHeaderComponent,
    PageLayoutComponent,

    // Forms
    ExportFormComponent,
    ImportFormComponent,
    CardFormComponent,
    FormConfirmComponent,

    // Modals
    ModalWrapperComponent,

    // Pipes

    // Directives
    ModalWrapperDirective
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
    ColorPickerModule,

    // Components
    BackBtnComponent,
    CardBlockComponent,
    NavBlockComponent,
    ToastComponent,
    ProgressBarComponent,

    // Layouts
    LayoutHeaderComponent,
    PageLayoutComponent,

    // Forms
    ExportFormComponent,
    ImportFormComponent,
    CardFormComponent,
    FormConfirmComponent,

    // Modals
    ModalWrapperComponent,

    // Pipes

    // Directives
    ModalWrapperDirective
  ],
  providers       :
  [
  ]
})
export class SharedModule {}
