// Angular modules
import { Component }        from '@angular/core';
import { Input }            from '@angular/core';
import { EventEmitter }     from '@angular/core';
import { Output }           from '@angular/core';
import { OnInit }           from '@angular/core';

// External modules
import { Clipboard }        from '@capacitor/clipboard';
import { TranslateService } from '@ngx-translate/core';

// Internal modules
import { ToastManager }     from '@blocks/toast/toast.manager';

// Helpers
import { StorageHelper }    from '@helpers/storage.helper';

// Models
import { Card }             from '@models/card.model';

@Component({
  selector    : 'app-export-form',
  templateUrl : './export-form.component.html',
  styleUrls   : ['./export-form.component.scss']
})
export class ExportFormComponent implements OnInit
{
  @Input()  data        : undefined;
  @Output() submitData  : EventEmitter<null> = new EventEmitter();
  @Output() submitClose : EventEmitter<null> = new EventEmitter();

  public isLoading : boolean = true;
  public cards     : Card[]  = [];

  constructor
  (
    private translateService : TranslateService,
    private toastManager     : ToastManager,
  ) { }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {
    this.cards     = await StorageHelper.getCards();
    this.isLoading = false;
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickCopyToClipboard() : Promise<void>
  {
    await Clipboard.write({ string : JSON.stringify(this.cards) });
    this.toastManager.quickShow(this.translateService.instant('COPY_CARDS_SUCCESS'), 'primary');
  }

  public onClickClose() : void
  {
    this.submitClose.emit();
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
