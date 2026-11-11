import { Routes } from '@angular/router';
import { profilRedirectionGuard } from './guards/profil-redirection-guard';
import { AjoutLivre } from './features/ajout-livre/ajout-livre';
import { Connexion } from './features/connexion/connexion';
import { Inscription } from './features/inscription/inscription';
import { CatalogComponent } from './features/catalog/catalog';
import { GestionProfil } from './features/gestion-profil/gestion-profil';
import { DashboardBibliothecaire } from './features/dashboard-bibliothecaire/dashboard-bibliothecaire';
import { DashboardBibliothecaireLayout } from './features/dashboard-bibliothecaire/dashboard-bibliothecaire-layout';
import { TousEmprunts } from './features/dashboard-bibliothecaire/tous-emprunts';
import { StatistiquesBibliothecaire } from './features/dashboard-bibliothecaire/statistiques-bibliothecaire';
import { DashboardAdministrateurLayout } from './features/dashboard-administrateur/dashboard-administrateur-layout';
import { DashboardAdministrateurAccueil } from './features/dashboard-administrateur/dashboard-administrateur-accueil';
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
  { path: '', component: CatalogComponent, pathMatch: 'full' },
  { path: 'inscription', component: Inscription },
  { path: 'connexion', component: Connexion },
  // Structure partagée : le menu ne disparaît pas pendant la navigation interne.
  {
    path: 'dashboard-bibliothecaire',
    component: DashboardBibliothecaireLayout,
    canActivate: [bibliothecaireGuard],
    children: [
      { path: '', component: DashboardBibliothecaire },
      { path: 'emprunts', component: TousEmprunts },
      { path: 'retards', component: ListeEmpruntsRetard },
      { path: 'reservations', component: ListesReservations },
      { path: 'statistiques', component: StatistiquesBibliothecaire },
      { path: 'ajouter-livre', component: AjoutLivre },
      { path: 'profil', component: GestionProfil },
    ],
  },
  {
    path: 'dashboard-administrateur',
    component: DashboardAdministrateurLayout,
    canActivate: [administrateurGuard],
    children: [
      { path: '', component: DashboardAdministrateurAccueil },
      { path: 'utilisateurs', component: ListeUtilisateurs },
      { path: 'ajouter-livre', component: AjoutLivre },
      { path: 'profil', component: GestionProfil },
    ],
  },
  // Anciens liens conservés pour la compatibilité avec les écrans existants.
  { path: 'listes-reservations', redirectTo: 'dashboard-bibliothecaire/reservations' },
  { path: 'emprunts-retard', redirectTo: 'dashboard-bibliothecaire/retards' },
  { path: 'admin/utilisateurs', redirectTo: 'dashboard-administrateur/utilisateurs' },
  { path: 'mes-reservations', component: MesReservations, canActivate: [utilisateurGuard] },
  { path: 'mes-emprunts', component: Emprunt, canActivate: [utilisateurGuard] },
  { path: 'livres/ajouter', redirectTo: 'dashboard-bibliothecaire/ajouter-livre' },
  { path: 'livres/:id/modifier', component: ModifierLivre, canActivate: [bibliothecaireGuard] },
  { path: 'gestion-profil', component: GestionProfil, canActivate: [profilRedirectionGuard] },
  { path: 'livres/:id', component: LivreDetail },
  { path: 'emprunts', component: Emprunt },
  // Ne pas toucher au dashboard lecteur déjà validé.
  {
    path: 'dashboard-lecteur', component: DashboardLecteurLayout,
    canActivate: [utilisateurGuard],
    children: [
      { path: '', component: DashboardLecteurAccueil },
      { path: 'mes-emprunts', component: MesEmprunts },
      { path: 'mon-historique', component: MonHistorique },
      { path: 'mes-reservations', component: MesReservations },
      { path: 'mes-commentaires', component: MesCommentaires },
      { path: 'profil', component: GestionProfil },
    ],
  },
  { path: '**', redirectTo: '' },
];
