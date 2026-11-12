import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Role } from '../models/role';

/** Les anciens liens /gestion-profil suivent désormais le rôle du JWT local. */
export const profilRedirectionGuard: CanActivateFn = () => {
  const compte = inject(UtilisateurService);
  const router = inject(Router);
  const role = compte.getRole();
  if (!compte.estConnecte()) return router.createUrlTree(['/connexion']);
  if (role === Role.ADMIN) return router.createUrlTree(['/dashboard-administrateur/profil']);
  if (role === Role.LIBRARIAN) return router.createUrlTree(['/dashboard-bibliothecaire/profil']);
  if (role === Role.USER) return router.createUrlTree(['/dashboard-lecteur/profil']);
  return router.createUrlTree(['/connexion']);
};
