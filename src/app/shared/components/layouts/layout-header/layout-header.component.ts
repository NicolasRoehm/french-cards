// Angular modules
import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { NavigationEnd }   from '@angular/router';
import { Router }          from '@angular/router';

// External modules
import { NgbOffcanvas }    from '@ng-bootstrap/ng-bootstrap';

// Internal modules
import { environment }     from '@env/environment';

@Component({
  selector    : 'app-layout-header',
  templateUrl : './layout-header.component.html',
  styleUrls   : ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit
{
  public appName         : string  = environment.appName;
  public isMenuCollapsed : boolean = true;

  constructor
  (
    private router           : Router,
    private offcanvasService : NgbOffcanvas,
  )
  {

  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Init ----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async ngOnInit() : Promise<void>
  {
    // NOTE Close offcanvas on navigation
    this.router.events.subscribe(event =>
    {
      if (event instanceof NavigationEnd)
        this.offcanvasService.dismiss();
    });
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE Actions -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickOffcanvas(content : any) : Promise<void>
  {
    this.offcanvasService.open(content);
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
