// Angular modules
import { Injectable }     from '@angular/core';
import { Router }         from '@angular/router';

// External modules
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable()
export class PermissionHelper
{
  public static async didUserGrantPermission(router ?: Router) : Promise<boolean>
  {
    // NOTE Check if user already granted permission
    const status = await BarcodeScanner.checkPermission({ force : false });

    // NOTE User granted permission
    if (status.granted)
      return true;

    // NOTE User denied permission
    if (status.denied)
      return false;

    // NOTE IOS only
    // probably means the permission has been denied
    if (status.restricted || status.unknown)
      return false;

    // NOTE User has not denied permission
    // but the user also has not yet granted the permission
    // so request it
    const statusRequest = await BarcodeScanner.checkPermission({ force : true });

    // NOTE The user did grant the permission now
    if (statusRequest.granted)
      return true;

    // NOTE User did not grant the permission, so he must have declined the request
    // NOTE Redirect to home if trying to scan
    if (router)
      router.navigate(['/home']);
    return false;
  }
}
