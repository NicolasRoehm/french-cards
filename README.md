# French Cards

Mes cartes de fidélité dans le téléphone : scan du code-barres, affichage plein écran luminosité au max en caisse,
transfert vers un nouveau téléphone en un QR code.

Angular 22 (standalone, signals, zoneless) + Capacitor 8 (Android).

## Installer l'APK

Chaque push sur `master` construit un APK signé et le publie en Release GitHub :

**https://github.com/NicolasRoehm/french-cards/releases/latest/download/french-cards.apk**

Le repo est privé : ouvre ce lien sur le téléphone en étant connecté à GitHub, puis autorise l'installation depuis
le navigateur (« Sources inconnues »). Un build manuel se lance depuis l'onglet *Actions* (`workflow_dispatch`).

## Changer de téléphone

- **Depuis cette version** : ancien téléphone *Transférer → Envoyer* affiche un QR code qui contient toutes les cartes
  (compressées). Nouveau téléphone : *Scanner une carte* (ou *Transférer → Recevoir*) et viser ce QR. C'est tout.
- **Fichier de sauvegarde** : *Transférer → Envoyer → Partager le fichier* (Quick Share, mail, Drive), puis
  *Recevoir → Choisir le fichier*.
- **Depuis l'ancienne app (v3)** : *Mode édition → Exporter les cartes → Copier*, s'envoyer le texte, puis
  *Recevoir → Coller depuis le presse-papiers*. L'ancien format JSON est relu tel quel.
- Une mise à jour de l'app sur le même téléphone migre aussi les cartes stockées par la v3.

Les doublons (même numéro de carte) sont ignorés à l'import.

## Développement

```bash
npm install
npm start                 # http://localhost:4200 (le scan n'existe que sur Android)
npm run sync              # build Angular + copie dans android/
npm run open:android      # Android Studio
npm run apk               # APK release en local (JDK 21 + Android SDK)
```

Live reload sur téléphone : `LIVE_RELOAD_URL=http://<ip-du-mac>:4200 npx cap run android`.

Sur macOS < 14, le binaire `sass-embedded` ne démarre pas : préfixer les builds par `NG_BUILD_SASS_EMBEDDED=0`.

## Signature

- Keystore : `.dsh/secrets/release.jks` (gitignoré), mots de passe dans `.env` (voir `.env.example`).
- CI : secrets GitHub `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`.
- En local, `npm run apk` utilise les variables `ANDROID_*` de l'environnement (`set -a; . ./.env; set +a`)
  ou `android/keystore.properties`, sinon la clé debug.

Garder ce keystore : sans lui, une mise à jour de l'app installée est impossible (il faut désinstaller, donc
exporter ses cartes avant).
