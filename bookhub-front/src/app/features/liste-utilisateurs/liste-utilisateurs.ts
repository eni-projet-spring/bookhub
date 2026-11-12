import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { Role } from '../../models/role';
import { UtilisateurResponse } from '../../models/utilisateur-response.model';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-utilisateurs.html',
  styleUrl: './liste-utilisateurs.css',
})
export class ListeUtilisateurs implements OnInit {
  private readonly utilisateurService = inject(UtilisateurService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  utilisateurs: UtilisateurResponse[] = [];

  chargementEnCours = false;
  messageErreur = '';
  messageSucces = '';

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';
    this.messageSucces = '';

    this.utilisateurService.listerUtilisateurs().subscribe({
      next: (utilisateurs) => {
        this.utilisateurs = utilisateurs;
        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des utilisateurs', erreur);

        this.messageErreur =
          erreur.error?.message ??
          erreur.error?.detail ??
          'Impossible de charger les utilisateurs.';

        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  modifierRoleDepuisSelect(utilisateur: UtilisateurResponse, valeur: string): void {
    this.modifierRole(utilisateur, valeur as Role);
  }

  modifierRole(utilisateur: UtilisateurResponse, nouveauRole: Role): void {
    if (utilisateur.role === nouveauRole) {
      return;
    }

    this.messageErreur = '';
    this.messageSucces = '';

    this.utilisateurService.modifierRole(utilisateur.idUtilisateur, nouveauRole).subscribe({
      next: (utilisateurModifie) => {
        utilisateur.role = utilisateurModifie.role;

        this.messageSucces = `Le rôle de ${utilisateur.prenom} ${utilisateur.nom} a été modifié.`;

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors de la modification du rôle', erreur);

        this.messageErreur =
          erreur.error?.message ?? erreur.error?.detail ?? 'Impossible de modifier le rôle.';

        this.chargerUtilisateurs();
      },
    });
  }
}
