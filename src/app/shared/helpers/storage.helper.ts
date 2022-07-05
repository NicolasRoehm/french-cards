// Angular modules
import { Injectable }  from '@angular/core';

// External modules
import { ArrayTyper }  from '@caliatys/array-typer';
import { Storage }     from '@capacitor/storage';

// Internal modules
import { environment } from '@env/environment';

// Enums
import { StorageKey }  from '@enums/storage-key.enum';

// Models
import { Card }        from '@models/card.model';

@Injectable()
export class StorageHelper
{
  private static storagePrefix : string = environment.appName + '_';

  // ----------------------------------------------------------------------------------------------
  // SECTION Methods ------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // NOTE Cards

  public static async getCards() : Promise<Card[]>
  {
    const keysResult = await Storage.keys();
    const cardKeys   = keysResult.keys.filter((key) => key.startsWith(this.storagePrefix + StorageKey.CARD));

    const jsonCards : any[] = [];
    for (const cardKey in cardKeys)
      jsonCards.push(await this.getItem(cardKey, false));

    const cards = ArrayTyper.asArray(Card, jsonCards);
    return cards;
  }

  public static async removeCard(id : string) : Promise<void>
  {
    await this.removeItem(StorageKey.CARD + id);
  }

  public static async setCard(card : Card) : Promise<void>
  {
    await this.setItem(StorageKey.CARD + card.id, card);
  }

  public static async getCard(id : string) : Promise<Card | null>
  {
    const data = await this.getItem(StorageKey.CARD + id);
    return data ? new Card(data) : null;
  }

  // !SECTION Methods

  // ----------------------------------------------------------------------------------------------
  // SECTION Storage ------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  public static async setItem(key : string, value : any, prefix : boolean = true) : Promise<void>
  {
    const itemKey = this.prefixer(key, prefix);
    return Storage.set({ key : itemKey, value : JSON.stringify(value) });
  }

  public static async getItem(key : string, prefix : boolean = true) : Promise<any | null>
  {
    const itemKey = this.prefixer(key, prefix);
    const res = await Storage.get({ key : itemKey });
    if (res.value !== null)
      return JSON.parse(res.value as any);
    return null;
  }

  public static async removeItem(key : string, prefix : boolean = true) : Promise<void>
  {
    const itemKey = this.prefixer(key, prefix);
    await Storage.remove({ key : itemKey });
  }

  // !SECTION Storage

  // NOTE Private

  private static prefixer(key : string, autoPrefix : boolean) : string
  {
    let itemKey = key;
    if (autoPrefix)
      itemKey = this.storagePrefix + key;
    return itemKey;
  }

}
