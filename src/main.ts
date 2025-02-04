import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { deepFreeze, elfHooks } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';

elfHooks.registerPreStoreUpdate((currentState, nextState, storeName) => {
   return deepFreeze(nextState);
});
devTools();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
   console.error(err),
);
