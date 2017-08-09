import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";

/**
 * To prevents the exception from being thrown upon UI change
 * Since we need to change UI multiple times in edit mode for model tags
 * it was showing console error
 */
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log('Successfully completed bootstrap.'))
    .catch(error => console.error(error));
