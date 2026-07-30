import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

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
}
