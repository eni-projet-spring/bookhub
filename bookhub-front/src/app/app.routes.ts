import { Routes } from '@angular/router';
import { Connexion } from './fr.eni.bookhub/pages/connexion/connexion';

export const routes: Routes = [
  // Route permettant d'accéder à la page de connexion.
  {
    path: 'connexion',
    component: Connexion,
  },
];
