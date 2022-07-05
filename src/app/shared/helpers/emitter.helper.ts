// Angular modules
import { Injectable }   from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class EmitterHelper
{
  public static emitRefreshList : EventEmitter<void> = new EventEmitter();

  public static sendRefreshList() : void
  {
    this.emitRefreshList.emit();
  }
}
