import themes from 'devextreme/ui/themes';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import config from 'devextreme/core/config'; 
import { licenseKey } from './devextreme-license'; 
 
config({ licenseKey });

if (environment.production) {
  enableProdMode();
}

themes.initialized(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err) => console.error(err));

});

