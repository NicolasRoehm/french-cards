// Angular modules
import { Component }             from '@angular/core';
import { ViewContainerRef }      from '@angular/core';
import { Input }                 from '@angular/core';
import { OnInit }                from '@angular/core';

// External modules
import { NgbModal }              from '@ng-bootstrap/ng-bootstrap';
import { TranslateService }      from '@ngx-translate/core';

// Internal modules
import { ToastManager }          from '@blocks/toast/toast.manager';

// Helpers
import { StorageHelper }         from '@helpers/storage.helper';
import { StringHelper }          from '@helpers/string.helper';

// Models
import { Card }                  from '@models/card.model';

// Components
import { CardFormComponent }     from '@forms/card-form/card-form.component';
import { FormConfirmComponent }  from '@forms/form-confirm/form-confirm.component';
import { ModalWrapperComponent } from '@modals/modal-wrapper/modal-wrapper.component';

@Component({
  selector    : 'app-card-block',
  templateUrl : './card-block.component.html',
  styleUrls   : ['./card-block.component.scss']
})
export class CardBlockComponent implements OnInit
{
  @Input() card     !: Card;
  @Input() editMode !: boolean;

  constructor
  (
    private viewContainerRef : ViewContainerRef,
    private translateService : TranslateService,
    private toastManager     : ToastManager,
    private ngbModal         : NgbModal,
  ) { }

  public ngOnInit() : void
  {
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickEdit() : Promise<void>
  {
    const modalRef = this.ngbModal.open(ModalWrapperComponent, { centered : true, backdrop : 'static' });
    modalRef.componentInstance.component     = CardFormComponent;
    modalRef.componentInstance.componentData = this.card;
    modalRef.componentInstance.modalData     = {
      title : this.translateService.instant('EDIT_CARD'),
      headerClasses : 'bg-primary text-white'
    };
    modalRef.result.then(async (info : { name : string, hexColor : string }) =>
    {
      // NOTE Update carte
      this.card.name     = info.name;
      this.card.hexColor = info.hexColor;
      this.card.hslColor = StringHelper.hexToHSL(this.card.hexColor);

      await StorageHelper.setCard(this.card);
    });
  }

  public async onClickDelete() : Promise<void>
  {
    const modalRef = this.ngbModal.open(ModalWrapperComponent, { centered : true, backdrop : 'static' });
    modalRef.componentInstance.component     = FormConfirmComponent;
    modalRef.componentInstance.componentData = { };
    modalRef.componentInstance.modalData     = {
      title         : this.translateService.instant('DELETE_CARD'),
      headerClasses : 'bg-danger text-white'
    };
    modalRef.result.then(async (submit : boolean) =>
    {
      if (!submit)
        return;
      // NOTE Delete card & component
      await StorageHelper.removeCard(this.card.id);
      this.viewContainerRef.element.nativeElement.parentElement.removeChild(this.viewContainerRef.element.nativeElement);
    });
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
