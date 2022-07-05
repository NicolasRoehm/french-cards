// Angular modules
import { Component } from '@angular/core';
import { Input }     from '@angular/core';
import { OnInit }    from '@angular/core';

@Component({
  selector    : 'app-header-block',
  templateUrl : './header-block.component.html',
  styleUrls   : ['./header-block.component.scss']
})
export class HeaderBlockComponent implements OnInit
{
  @Input() title !: string;
  @Input() icon  !: string;

  constructor() { }

  public ngOnInit() : void
  {
  }

}
