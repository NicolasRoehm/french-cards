import type { CapacitorConfig } from '@capacitor/cli';

// Live reload : LIVE_RELOAD_URL=http://<ip-du-mac>:4200 npx cap run android
const liveReloadUrl = process.env['LIVE_RELOAD_URL'];

const config: CapacitorConfig = {
  appId: 'com.frenchstack.cards',
  appName: 'French Cards',
  webDir: 'dist/french-cards/browser',
  android: {
    backgroundColor: '#0b1a4f',
  },
  plugins: {
    SystemBars: {
      style: 'DARK',
    },
  },
  ...(liveReloadUrl ? { server: { url: liveReloadUrl, cleartext: true } } : {}),
};

export default config;
