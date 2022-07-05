// Angular modules
import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageHelper } from '@helpers/storage.helper';

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
  public cardId    !: string;
  public card      ?: Card | null;

  constructor(private activatedRoute : ActivatedRoute)
  {
    // NOTE Get query parameters
    this.activatedRoute.queryParams.subscribe(async params =>
    {
      this.cardId = params['cardId'];
      this.initCard();
    });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {

  }

  private async initCard() : Promise<void>
  {
    const card     = await StorageHelper.getCard(this.cardId);
    this.isLoading = false;
    this.card      = card;
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
