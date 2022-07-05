// Angular modules
import { Component } from '@angular/core';
import { Input }     from '@angular/core';
import { OnInit }    from '@angular/core';

// Models
import { Card }      from '@models/card.model';

@Component({
  selector    : 'app-card-block',
  templateUrl : './card-block.component.html',
  styleUrls   : ['./card-block.component.scss']
})
export class CardBlockComponent implements OnInit
{
  @Input() card !: Card;

  constructor() { }

  public ngOnInit() : void
  {
  }

}
