// SPDX-License-Identifier: Apache-2.0
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { OpenidlCommonModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(OpenidlCommonModule)
  .catch(err => console.log(err));
