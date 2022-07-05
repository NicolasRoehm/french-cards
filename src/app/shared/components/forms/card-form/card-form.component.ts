// Angular modules
import { Component }    from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { OnInit }       from '@angular/core';
import { FormControl }  from '@angular/forms';
import { FormGroup }    from '@angular/forms';
import { Validators }   from '@angular/forms';

@Component({
  selector    : 'app-card-form',
  templateUrl : './card-form.component.html',
  styleUrls   : ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit
{
  @Input()  data        : any;
  @Output() submitData  : EventEmitter<{ name : string, color : string }> = new EventEmitter();
  @Output() submitClose : EventEmitter<null>   = new EventEmitter();

  public formSubmitLoading : boolean = false;
  public formGroup !: FormGroup<{
    name      : FormControl<string>,
    bgColor   : FormControl<string>,
    textColor : FormControl<string>,
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
    this.formGroup = new FormGroup({
      name      : new FormControl<string>('', { validators : Validators.required, nonNullable : true }),
      bgColor   : new FormControl<string>('#0d6efd', { validators : Validators.required, nonNullable : true }),
      textColor : new FormControl<string>('#ffffff', { validators : Validators.required, nonNullable : true }),
    });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public onClickSubmit()
  {
    const name    = this.formGroup.controls.name.getRawValue();
    const bgColor = this.formGroup.controls.bgColor.getRawValue();
    this.submitData.emit({ name, color : bgColor });
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
