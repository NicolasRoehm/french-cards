// Angular modules
import { Component }     from '@angular/core';
import { OnDestroy }     from '@angular/core';
import { OnInit }        from '@angular/core';

// External modules
import { Subscription }  from 'rxjs';

// Helpers
import { EmitterHelper } from '@helpers/emitter.helper';
import { StorageHelper } from '@helpers/storage.helper';

// Models
import { Card }          from '@models/card.model';

@Component({
  selector    : 'app-home',
  templateUrl : './home.component.html',
  styleUrls   : ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy
{
  public editMode  : boolean = false;
  public isLoading : boolean = true;
  public cards     : Card[]  = [];

  // NOTE Subscription
  private refreshListSub : Subscription;

  constructor
  (
  )
  {
    this.refreshListSub = this.refreshListSubscription();
  }

  public async ngOnInit() : Promise<void>
  {
    await this.initCards();
  }

  public ngOnDestroy() : void
  {
    this.refreshListSub.unsubscribe();
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  private async initCards() : Promise<void>
  {
    this.isLoading = true;
    this.cards     = await StorageHelper.getCards();
    this.isLoading = false;
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

  private refreshListSubscription() : Subscription
  {
    return EmitterHelper.emitRefreshList.subscribe(_ =>
    {
      this.initCards();
    });
  }

}
