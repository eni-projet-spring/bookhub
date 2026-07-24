import { Routes } from '@angular/router';
import { AjoutLivre } from './features/ajout-livre/ajout-livre';
import { Connexion } from './features/connexion/connexion';
import { Inscription } from './features/inscription/inscription';

export const routes: Routes = [
  {
    path: 'connexion',
    component: Connexion,
  },
  {
    path: 'inscription',
    component: Inscription,
  },
  {
    path: 'livres/ajouter',
    component: AjoutLivre,
  },
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'connexion',
  },
];
