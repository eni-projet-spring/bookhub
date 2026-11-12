import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Enregistrer la locale avant le bootstrap : tous les DatePipe en français
// (dashboard, emprunts, retards) doivent pouvoir formater les dates réelles.
registerLocaleData(localeFr);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
