import { Routes } from '@angular/router';
import { AjoutLivre } from './features/ajout-livre/ajout-livre';
import { Connexion } from './features/connexion/connexion';
import { Inscription } from './features/inscription/inscription';
import { GestionProfil} from './features/gestion-profil/gestion-profil';
import { DashboardReservations } from './features/dashboard-reservations/dashboard-reservations';
import { MesReservations } from './features/mes-reservations/mes-reservations';

export const routes: Routes = [
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
    path: 'dashboard-reservations',
    component: DashboardReservations,
  },
  {
    path: 'mes-reservations',
    component: MesReservations,
  },

  {
    path: 'gestion-profil',
    component: GestionProfil,
  },
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full',
  },
];
