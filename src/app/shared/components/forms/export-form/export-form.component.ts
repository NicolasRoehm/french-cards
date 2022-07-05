// Angular modules
import { Component, Input }     from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { Output }        from '@angular/core';
import { OnInit }        from '@angular/core';

// External modules
import { Clipboard }     from '@capacitor/clipboard';

// Helpers
import { StorageHelper } from '@helpers/storage.helper';

// Models
import { Card }          from '@models/card.model';

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

  constructor() { }

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
