import { Routes } from '@angular/router';
import { AjoutLivre } from './features/ajout-livre/ajout-livre';
import { Connexion } from './features/connexion/connexion';
import { Inscription } from './features/inscription/inscription';
import { CatalogComponent } from './features/catalog/catalog';
import { GestionProfil} from './features/gestion-profil/gestion-profil';
import { DashboardBibliothecaire } from './features/dashboard-bibliothecaire/dashboard-bibliothecaire';
import { MesReservations } from './features/mes-reservations/mes-reservations';
import { Emprunt } from './features/emprunt/emprunt';
import { LivreDetail } from './features/livre-detail/livre-detail';
import { ModifierLivre } from './features/modifier-livre/modifier-livre';
import { DashboardLecteurLayout } from './features/dashboard-lecteur/dashboard-lecteur-layout/dashboard-lecteur-layout';
import { MonHistorique } from './features/mon-historique/mon-historique';
import { DashboardLecteurAccueil } from './features/dashboard-lecteur/dashboard-lecteur-accueil/dashboard-lecteur-accueil';
import { MesCommentaires } from './features/mes-commentaires/mes-commentaires';
import { MesEmprunts } from './features/dashboard-lecteur/mes-emprunts/mes-emprunts';
export const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    pathMatch: 'full',
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
    path: 'dashboard-bibliothecaire',
    component: DashboardBibliothecaire,
  },
  {
    path: 'mes-reservations',
    component: MesReservations,
  },
  {
    path: 'livres/ajouter',
    component: AjoutLivre,
  },
  {
    path: 'livres/:id/modifier',
    component: ModifierLivre,
  },
  {
    path: 'gestion-profil',
    component: GestionProfil,
  },
  {
    path: 'livres/:id',
    component: LivreDetail,
  },

  {
    path: 'emprunts',
    component: Emprunt,
  },
  {
    path: 'dashboard-lecteur',
    component: DashboardLecteurLayout,
    children: [
      {
        path: '',
        component: DashboardLecteurAccueil,
      },
      {
        path: 'mes-emprunts',
        component: MesEmprunts,
      },
      {
        path: 'mon-historique',
        component: MonHistorique,
      },
      {
        path: 'mes-reservations',
        component: MesReservations,
      },
      {
        path: 'mes-commentaires',
        component: MesCommentaires,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
