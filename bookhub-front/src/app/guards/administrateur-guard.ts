import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Role } from '../models/role';
import { UtilisateurService } from '../services/utilisateur.service';

export const administrateurGuard: CanActivateFn = () => {
  const utilisateurService = inject(UtilisateurService);
  const router = inject(Router);

  if (!utilisateurService.estConnecte()) {
    return router.createUrlTree(['/connexion']);
  }

  if (utilisateurService.getRole() === Role.ADMIN) {
    return true;
  }

  return router.createUrlTree(['/']);
};
