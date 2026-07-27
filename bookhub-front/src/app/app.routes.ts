import { Routes } from '@angular/router';
import { AjoutLivre } from './features/ajout-livre/ajout-livre';
import { Connexion } from './features/connexion/connexion';
import { Inscription } from './features/inscription/inscription';
import { GestionProfil} from './features/gestion-profil/gestion-profil';

export const routes: Routes = [
  // Route permettant d'accéder à la page de connexion.
  {
    path: 'livres/ajouter',
    component: AjoutLivre,
  },
  {
    path: 'inscription',
    component: Inscription,
  },
  {
    path: 'connexion',
    component: Connexion,
  },
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full',
  },

  {
    path: 'gestion-profil',
    component: GestionProfil,
  }
];
