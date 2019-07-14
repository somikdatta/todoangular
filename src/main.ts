import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ngsw-worker.js');
  }
}).catch(err => console.error(err));

window.addEventListener('load', function () {
  (<HTMLInputElement>document.getElementById('hide')).textContent = (<HTMLInputElement>document.getElementById('show')).value;
  (<HTMLInputElement>document.getElementById('show')).style.width = (<HTMLInputElement>document.getElementById('hide')).offsetWidth + "px";
});
