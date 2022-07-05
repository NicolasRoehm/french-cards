// Angular modules
import { Component }        from '@angular/core';
import { EventEmitter }     from '@angular/core';
import { Input }            from '@angular/core';
import { Output }           from '@angular/core';
import { OnInit }           from '@angular/core';
import { FormControl }      from '@angular/forms';
import { FormGroup }        from '@angular/forms';
import { Validators }       from '@angular/forms';

// External modules
import { ArrayTyper }       from '@caliatys/array-typer';
import { Clipboard }        from '@capacitor/clipboard';
import { TranslateService } from '@ngx-translate/core';

// Internal modules
import { ToastManager }     from '@blocks/toast/toast.manager';

// Helpers
import { StorageHelper }    from '@helpers/storage.helper';

// Models
import { Card }             from '@models/card.model';

@Component({
  selector    : 'app-import-form',
  templateUrl : './import-form.component.html',
  styleUrls   : ['./import-form.component.scss']
})
export class ImportFormComponent implements OnInit
{
  @Input()  data        : undefined;
  @Output() submitData  : EventEmitter<{ name : string, hexColor : string }> = new EventEmitter();
  @Output() submitClose : EventEmitter<null>   = new EventEmitter();

  public formSubmitLoading : boolean = false;
  public formGroup !: FormGroup<{
    content : FormControl<string>,
  }>;

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
    this.initFormGroup();
  }

  private async initFormGroup() : Promise<void>
  {
    this.formGroup = new FormGroup({
      content : new FormControl<string>('', { validators : Validators.required, nonNullable : true }),
    });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickPasteToClipboard() : Promise<void>
  {
    const { type, value } = await Clipboard.read();
    if (!value)
      return this.toastManager.quickShow(this.translateService.instant('EMPTY_CLIPBOARD'), 'warning');
    this.formGroup.controls.content.setValue(value);
  }

  public async onClickSubmit() : Promise<void>
  {
    const data  = this.formGroup.controls.content.getRawValue();
    const cards = ArrayTyper.asArray(Card, data);

    const dups : Card[] = [];
    for (const card of cards)
    {
      const dup = await StorageHelper.getCard(card.id);
      if (dup)
      {
        dups.push(dup);
        continue;
      }
      await StorageHelper.setCard(card);
    }

    this.toastManager.quickShow(this.translateService.instant('IMPORT_CARD_SUCCESS'), 'success');
    if (dups.length)
    {
      const names = dups.map(d => d.name).join(', ');
      this.toastManager.quickShow(this.translateService.instant('IMPORT_DUPLICATION') + names, 'warning');
    }

    this.submitClose.emit();
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
