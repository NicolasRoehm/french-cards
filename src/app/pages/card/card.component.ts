// Angular modules
import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }         from '@angular/router';

// External modules

// Internal modules
import { ToastManager }   from '@blocks/toast/toast.manager';

// Models
import { Card }           from '@models/card.model';

@Component({
  selector    : 'app-card',
  templateUrl : './card.component.html',
  styleUrls   : ['./card.component.scss']
})
export class CardComponent implements OnInit
{
  public isLoading  : boolean = true;
  public cardId    !: string
  public fromLink  !: string
  public card      ?: Card;

  constructor
  (
    private router         : Router,
    private activatedRoute : ActivatedRoute,
    private toastManager   : ToastManager
  )
  {
    // NOTE Get routing data
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state)
    {
      this.card      = nav.extras.state as Card;
      this.isLoading = false;
    }

    // NOTE Get query parameters
    this.activatedRoute.queryParams.subscribe(async params =>
    {
      this.cardId   = params['cardId'];
      this.fromLink = params['fromLink'];
      // if (!this.card)
      //   await this.getCard();
    });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {

  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

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
