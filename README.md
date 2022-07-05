# FrenchCards Mobile

## TODO
- App favicon & splash + nav logo

## Build
- **Update application version**
  - Change the `VERSION` value in [environment.enum.ts](src/app/shared/enums/environment.enum.ts)
  - Change the `"update:version"` command in [package.json](package.json) - Also update build number like the version number, but with `zero` instead of `dot` and with a `zero` at the end
  - Run the updated `npm run update:version` command to apply the changes
- **Build application**
  - Build Angular application with `npm run build`
  - Build APK
    - Open Android Studio with `npm run open:android`
    - Go to `Build` > `Generate Signed Bundle or APK`
    - Click on the `APK` radio button and click on the `Next` button
    - Set the `Key store path` to [release-key.keystore](release-key.keystore) file path
    - Set the `Key store password` to ``
    - Set the `Key alias` to ``
    - Set the `Key password` to ``
    - Click on the `Next` button
    - Select `Build Variants` : `release` then click on the `Finish` button
    - Enjoy your [app-release.apk](android/app/release/app-release.apk)

## Google Play Store


## Development

- Install Angular dependencies with `npm install`
- **Open localhost** cf. [StackOverflow issue](https://stackoverflow.com/a/61727538/7462178)
  - Search for `Windows Defender Firewall`
  - Click on `Turn Windows defender firewall on or off` 
  - Turn off for all settings and click `Ok`
- **Update IPV4 address**
  - `host` in [environment.ts](src/environments/environment.ts)
  - `target` in [proxy.conf.json](proxy.conf.json)
  - `localUrl` in [capacitor.config.ts](capacitor.config.ts)
- Start the API
- Start the Angular application
  - **Local**   : `npm run start` - *Requires a locally running API*
  - **Staging** : `npm run start:staging` - *Requires API running in production*
- Open Android Studio with `npm run open:android`
  - Pair your Android device to Android Studio
- Start the Android application with Android Studio
- In order to debug Angular inside Android using Chrome, go to `chrome://inspect/devices`

## Testing

