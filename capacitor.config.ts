
// External modules
import { CapacitorConfig } from '@capacitor/cli';

// Enums
import { EnvName }         from './src/app/shared/enums/environment.enum';

let config : CapacitorConfig;

const baseConfig : CapacitorConfig = {
  appId             : 'com.frenchstack.cards',
  appName           : 'French Stack - French Cards',
  webDir            : 'dist/french-cards',
  bundledWebRuntime : false,
};

const localUrl = 'http://192.168.0.2:4200';

const parameter = String((process.env as any).NODE_ENV).trim();
switch (parameter)
{
  case EnvName.LOCAL :
    config = {
      ...baseConfig,
      server : {
        url       : localUrl, // NOTE Live reload
        cleartext : true,
      }
    };
    break;
  case EnvName.STAGING :
    config = {
      ...baseConfig,
      server : {
        url           : localUrl, // NOTE Live reload
        cleartext     : true,
        androidScheme : 'https'
      }
    };
    break;
  default : // NOTE PROD
    config = {
      ...baseConfig,
      server : {
        cleartext     : true,
        androidScheme : 'https'
      }
    };
    break;
}

export default config;
