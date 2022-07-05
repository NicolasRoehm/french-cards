// Angular modules
import { Component }             from '@angular/core';
import { OnInit }                from '@angular/core';
import { OnDestroy }             from '@angular/core';
import { Router }                from '@angular/router';

// External modules
import { BarcodeScanner }        from '@capacitor-community/barcode-scanner';
import { SupportedFormat }       from '@capacitor-community/barcode-scanner';
import { NgbModal }              from '@ng-bootstrap/ng-bootstrap';
import { TranslateService }      from '@ngx-translate/core';

// Internal modules
import { ToastManager }          from '@blocks/toast/toast.manager';

// Helpers
import { PermissionHelper }      from '@helpers/permission.helper';
import { StorageHelper }         from '@helpers/storage.helper';

// Models
import { Card }                  from '@models/card.model';

// Components
import { CardFormComponent }     from '@forms/card-form/card-form.component';
import { ModalWrapperComponent } from '@modals/modal-wrapper/modal-wrapper.component';

@Component({
  selector    : 'app-scan',
  templateUrl : './scan.component.html',
  styleUrls   : ['./scan.component.scss']
})
export class ScanComponent implements OnInit, OnDestroy
{
  public isScanning    : boolean = false;
  public hasPermission : boolean | null = null;

  constructor
  (
    private router           : Router,
    private translateService : TranslateService,
    private toastManager     : ToastManager,
    private ngbModal         : NgbModal,
  )
  { }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {
    // NOTE Preload scanner plugin
    await BarcodeScanner.prepare();
    // NOTE Init camera permission
    this.hasPermission = await PermissionHelper.didUserGrantPermission();
  }

  public async ngOnDestroy() : Promise<void>
  {
    await this.forceCloseCamera();
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickToggleCamera() : Promise<void>
  {
    this.isScanning = !this.isScanning;
    await this.toggleBackground();
    if (this.isScanning)
    {
      await this.openCamera();
      return;
    }
    await BarcodeScanner.stopScan();
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Computed props ------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Helpers -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  private async openCamera() : Promise<void>
  {
    // NOTE Start scanning and wait for a result
    const result = await BarcodeScanner.startScan({ targetedFormats : [ ] });
    if (!result.hasContent || !result.content)
      return;

    const cardId = result.content;
    const format = result.format;

    this.openCardForm().then(async (cardName : string) =>
    {
      const card = new Card({
        id     : cardId,
        format : format,
        name   : cardName
      });

      // NOTE Redirect to certificate
      await this.forceCloseCamera();

      // NOTE Add card to storage
      StorageHelper.setCard(card);

      this.router.navigate(['/home']);
      // this.router.navigate(['/card'], { queryParams : { cardId, fromLink : '/scan' }});
    });
  }

  private async forceCloseCamera() : Promise<void>
  {
    this.isScanning = false;
    await this.toggleBackground();
    await BarcodeScanner.stopScan();
  }

  private async toggleBackground() : Promise<void>
  {
    if (this.isScanning)
    {
      await BarcodeScanner.hideBackground();
      document.body.style.background = 'transparent';
      return;
    }
    await BarcodeScanner.showBackground();
    document.body.style.background = '#fff';
  }

  private async showError(message : string) : Promise<void>
  {
    this.toastManager.quickShow(this.translateService.instant(message));
    await this.forceCloseCamera();
  }

  private openCardForm() : Promise<any>
  {
    const modalRef = this.ngbModal.open(ModalWrapperComponent, { centered : true, backdrop : 'static', size: 'lg'});
    modalRef.componentInstance.component     = CardFormComponent;
    modalRef.componentInstance.componentData = {  };
    modalRef.componentInstance.modalData     = {
      title : this.translateService.instant('CARD')
    };
    return modalRef.result;
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Requests ------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Subscriptions -------------------------------------------------------
  // -------------------------------------------------------------------------------

}
