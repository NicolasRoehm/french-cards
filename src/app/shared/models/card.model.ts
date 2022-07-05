// Types
import { BarcodeFormat } from '@app-types/barcode-format.types';

// Helpers
import { StringHelper } from '@helpers/string.helper';

export class Card
{
  public id       !: string;
  public hexColor !: string;
  public hslColor !: { h : number, s : number, l : number };
  public format   !: BarcodeFormat;
  public name     !: string;

  constructor(json ?: any)
  {
    if (!json)
      return;

    this.id       = json.id       || '';
    this.hexColor = json.hexColor || '';
    this.hslColor = json.hexColor ? StringHelper.hexToHSL(json.hexColor) : { h : 0, s : 0, l : 0 };
    this.format   = json.format   ? json.format.replaceAll('_', '') : '';
    this.name     = json.name     || '';
  }
}
