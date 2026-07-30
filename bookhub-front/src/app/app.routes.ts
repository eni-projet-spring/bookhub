import { Routes } from '@angular/router';
import { AjoutLivre } from './features/ajout-livre/ajout-livre';
import { Connexion } from './features/connexion/connexion';
import { Inscription } from './features/inscription/inscription';
import { CatalogComponent } from './features/catalog/catalog';
import { GestionProfil } from './features/gestion-profil/gestion-profil';
import { DashboardBibliothecaire } from './features/dashboard-bibliothecaire/dashboard-bibliothecaire';
import { ListesReservations } from './features/listes-reservations/listes-reservations';
import { MesReservations } from './features/mes-reservations/mes-reservations';
import { Emprunt } from './features/emprunt/emprunt';
import { LivreDetail } from './features/livre-detail/livre-detail';
import { ModifierLivre } from './features/modifier-livre/modifier-livre';
import { DashboardLecteurLayout } from './features/dashboard-lecteur/dashboard-lecteur-layout/dashboard-lecteur-layout';
import { MonHistorique } from './features/mon-historique/mon-historique';
import { DashboardLecteurAccueil } from './features/dashboard-lecteur/dashboard-lecteur-accueil/dashboard-lecteur-accueil';
import { MesCommentaires } from './features/mes-commentaires/mes-commentaires';
import { MesEmprunts } from './features/dashboard-lecteur/mes-emprunts/mes-emprunts';

import { bibliothecaireGuard } from './guards/bibliothecaire-guard';
import { utilisateurGuard } from './guards/utilisateur-guard';
import { ListeEmpruntsRetard } from './features/liste-emprunts-retard/liste-emprunts-retard';
import { ListeUtilisateurs } from './features/liste-utilisateurs/liste-utilisateurs';
import { administrateurGuard } from './guards/administrateur-guard';

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
    canActivate: [bibliothecaireGuard],
  },

  // Liste des réservations à confirmer/rejeter (bibliothécaire)
  {
    path: 'listes-reservations',
    component: ListesReservations,
    canActivate: [bibliothecaireGuard],
  },
  {
    path: 'emprunts-retard',
    component: ListeEmpruntsRetard,
    canActivate: [bibliothecaireGuard],
  },
  {
    path: 'admin/utilisateurs',
    component: ListeUtilisateurs,
    canActivate: [administrateurGuard],
  },
  // Mes réservations (lecteur)
  {
    path: 'mes-reservations',
    component: MesReservations,
    canActivate: [utilisateurGuard],
  },

  {
    path: 'mes-emprunts',
    component: Emprunt,
    canActivate: [utilisateurGuard],
  },
  {
    path: 'livres/ajouter',
    component: AjoutLivre,
    canActivate: [bibliothecaireGuard],
  },
  {
    path: 'livres/:id/modifier',
    component: ModifierLivre,
    canActivate: [bibliothecaireGuard],
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
