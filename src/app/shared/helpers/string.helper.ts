// Angular modules
import { Injectable } from '@angular/core';

@Injectable()
export class StringHelper
{
  /** JavaScript equivalent to printf/String.Format
   *  https://stackoverflow.com/a/31007976/7462178
   */
  public static interpolate(theString : string, argumentArray : string[]) : string
  {
    let regex = /%s/;
    let _r = function(p : string, c : string) { return p.replace(regex, c); };
    return argumentArray.reduce(_r, theString);
  }

  public static buildURIParams(parameters : object) : string
  {
    const parts = new URLSearchParams()

    for (const [key, value] of Object.entries(parameters))
    {
      if (key === undefined || value === undefined)
        continue;
      parts.append(key, value)
    }

    return '?' + parts.toString()
  }

  /** https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf */
  public static hexToHSL(hex : string) : { h : number, s : number, l : number }
  {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result)
      return { h : 0, s : 0, l : 0 };
    console.log(result);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h !: number, s, l = (max + min) / 2;
    if (max == min)
      h = s = 0; // NOTE Achromatic
    else
    {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max)
      {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
}
