// Angular modules
import { Component }    from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { OnInit }       from '@angular/core';
import { FormControl }  from '@angular/forms';
import { FormGroup }    from '@angular/forms';
import { Validators }   from '@angular/forms';

// Models
import { Card }         from '@models/card.model';

@Component({
  selector    : 'app-card-form',
  templateUrl : './card-form.component.html',
  styleUrls   : ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit
{
  @Input()  data       !: Card | void;
  @Output() submitData  : EventEmitter<{ name : string, hexColor : string }> = new EventEmitter();
  @Output() submitClose : EventEmitter<null>   = new EventEmitter();

  public formSubmitLoading : boolean = false;
  public formGroup !: FormGroup<{
    name     : FormControl<string>,
    hexColor : FormControl<string>,
  }>;

  constructor() { }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {
    this.initFormGroup();
  }

  private async initFormGroup() : Promise<void>
  {
    const name     = this.data ? this.data.name     : '';
    const hexColor = this.data ? this.data.hexColor : '#0d6efd';

    this.formGroup = new FormGroup({
      name     : new FormControl<string>(name,     { validators : Validators.required, nonNullable : true }),
      hexColor : new FormControl<string>(hexColor, { validators : Validators.required, nonNullable : true }),
    });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public onClickSubmit()
  {
    const name     = this.formGroup.controls.name.getRawValue();
    const hexColor = this.formGroup.controls.hexColor.getRawValue();
    this.submitData.emit({ name, hexColor });
  }

  public onClickClose()
  {

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
