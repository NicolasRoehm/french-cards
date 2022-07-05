// Types
import { BarcodeFormat } from '@app-types/barcode-format.types';

export class Card
{
  public id     !: string;
  public color  !: string;
  public format !: BarcodeFormat;
  public name   !: string;

  constructor(json ?: any)
  {
    if (!json)
      return;

    this.id     = json.id     || '';
    this.color  = json.color  || '';
    this.format = json.format ? json.format.replaceAll('_', '') : '';
    this.name   = json.name   || '';
  }
}
