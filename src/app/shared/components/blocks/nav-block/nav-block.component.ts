// Angular modules
import { Component }             from '@angular/core';
import { Input }                 from '@angular/core';
import { OnInit }                from '@angular/core';

// External modules
import { NgbModal }              from '@ng-bootstrap/ng-bootstrap';
import { TranslateService }      from '@ngx-translate/core';

// Internal modules
import { ToastManager }          from '@blocks/toast/toast.manager';

// Components
import { ExportFormComponent }   from '@forms/export-form/export-form.component';
import { ImportFormComponent }   from '@forms/import-form/import-form.component';
import { ModalWrapperComponent } from '@modals/modal-wrapper/modal-wrapper.component';

@Component({
  selector    : 'app-nav-block',
  templateUrl : './nav-block.component.html',
  styleUrls   : ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit
{
  @Input() withHome : boolean = false;

  constructor
  (
    private translateService : TranslateService,
    private toastManager     : ToastManager,
    private ngbModal         : NgbModal,
  ) { }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickExport() : Promise<void>
  {
    const modalRef = this.ngbModal.open(ModalWrapperComponent, { centered : true, backdrop : 'static' });
    modalRef.componentInstance.component     = ExportFormComponent;
    modalRef.componentInstance.componentData = { };
    modalRef.componentInstance.modalData     = {
      title : this.translateService.instant('EXPORT_CARDS'),
      headerClasses : 'bg-primary text-white'
    };
    modalRef.result.then(async () =>
    {

    }, () => { /* do nothing */ });
  }

  public async onClickImport() : Promise<void>
  {
    const modalRef = this.ngbModal.open(ModalWrapperComponent, { centered : true, backdrop : 'static' });
    modalRef.componentInstance.component     = ImportFormComponent;
    modalRef.componentInstance.componentData = { };
    modalRef.componentInstance.modalData     = {
      title : this.translateService.instant('IMPORT_CARDS'),
      headerClasses : 'bg-primary text-white'
    };
    modalRef.result.then(async () =>
    {

    }, () => { /* do nothing */ });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Computed props ------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Helpers -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Requests ------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Subscriptions -------------------------------------------------------
  // -------------------------------------------------------------------------------

}
