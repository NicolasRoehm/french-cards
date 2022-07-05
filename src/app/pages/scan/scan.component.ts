// Angular modules
import { Component }        from '@angular/core';
import { OnInit }           from '@angular/core';
import { OnDestroy }        from '@angular/core';
import { Router }           from '@angular/router';

// External modules
import { BarcodeScanner }   from '@capacitor-community/barcode-scanner';
import { SupportedFormat }  from '@capacitor-community/barcode-scanner';
import { TranslateService } from '@ngx-translate/core';

// Internal modules
import { ToastManager }     from '@blocks/toast/toast.manager';

// Helpers
import { PermissionHelper } from '@helpers/permission.helper';
import { StorageHelper }    from '@helpers/storage.helper';

// Models
import { Card }             from '@models/card.model';

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
    private toastManager     : ToastManager
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
    // console.log(result.content)

    // TODO Generate barcode

    // NOTE Redirect to certificate
    await this.forceCloseCamera();
    // NOTE Add search to history
    StorageHelper.addCard(new Card({}));
    this.router.navigate(['/card'], { queryParams : { cardId, fromLink : '/scan' }});
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

  // -------------------------------------------------------------------------------
  // ---- NOTE Requests ------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // ---- NOTE Subscriptions -------------------------------------------------------
  // -------------------------------------------------------------------------------

}
