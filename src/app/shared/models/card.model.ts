export class Card
{
  public id      !: string;
  public barcode !: string; // SVG
  public color   !: string;
  public name    !: string;

  constructor(json ?: any)
  {
    if (!json)
      return;

    this.id      = json.id      || '';
    this.barcode = json.barcode || '';
    this.color   = json.color   || '';
    this.name    = json.name    || '';
  }
}
