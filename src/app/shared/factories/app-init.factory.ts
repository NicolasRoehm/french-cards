// Angular modules
import { LOCATION_INITIALIZED } from '@angular/common';
import { Injector }             from '@angular/core';

// External modules
import { TranslateService }     from '@ngx-translate/core';
import { firstValueFrom }       from 'rxjs';

// Internal modules
import { environment }          from '@env/environment';

// Helpers
import { StorageHelper }        from '@helpers/storage.helper';

/**
 * NOTE Safely use translate.instant()
 * https://github.com/ngx-translate/core/issues/517
 */
export function appInitFactory(translate : TranslateService, injector : Injector) : () => Promise<void>
{
  return () => new Promise<void>((resolve, reject) =>
  {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve());
    locationInitialized.then(async _ =>
    {
      translate.setDefaultLang(environment.defaultLanguage);

      const language = environment.defaultLanguage;
      const obs = translate.use(language);
      try {
        await firstValueFrom(obs);
        console.info(`Successfully initialized '${language}' language.`);
      } catch (error) {
        console.error(`Problem with '${language}' language initialization.`);
      }
      return resolve();
    });
  });
}
