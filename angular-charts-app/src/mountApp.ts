import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

enableProdMode();

interface awsCognitoDetails {
  userDataKey: string;
};

const mount = (cognitoDetails: awsCognitoDetails) => {
  localStorage.setItem('userDataKey', cognitoDetails.userDataKey);
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

export { mount };