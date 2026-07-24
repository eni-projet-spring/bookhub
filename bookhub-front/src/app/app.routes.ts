import { Routes } from '@angular/router';
import { Connexion } from './fr.eni.bookhub/pages/connexion/connexion';
import { AjoutLivre } from './fr.eni.bookhub/pages/ajout-livre/ajout-livre';
export const routes: Routes = [
  // Route permettant d'accéder à la page de connexion.
  {
    path: 'connexion',
    component: Connexion,
  },
  {
    path: 'livres/ajouter',
    component: AjoutLivre,
  },
];
