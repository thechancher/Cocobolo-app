import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cocobolo.app',
  appName: 'Cocobolo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
