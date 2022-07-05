// Angular modules
import { Component } from '@angular/core';
import { Input }     from '@angular/core';
import { OnInit }    from '@angular/core';

@Component({
  selector    : 'app-back-btn',
  templateUrl : './back-btn.component.html',
  styleUrls   : ['./back-btn.component.scss']
})
export class BackBtnComponent implements OnInit
{
  @Input() backTo : string = '/home';

  constructor() { }

  public ngOnInit() : void
  {
  }

}
