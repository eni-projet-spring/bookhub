import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { EmpruntResponse } from '../../models/emprunt-response';
import { EmpruntService } from '../../services/emprunt-service';

@Component({
  selector: 'app-liste-emprunts-retard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-emprunts-retard.html',
  styleUrl: './liste-emprunts-retard.css',
})
export class ListeEmpruntsRetard implements OnInit {
  private readonly empruntService = inject(EmpruntService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  empruntsEnRetard: EmpruntResponse[] = [];

  chargementEnCours = false;

  idEmpruntEnCoursDeTraitement: number | null = null;

  messageErreur = '';

  messageSucces = '';

  ngOnInit(): void {
    this.actualiserListe();
  }

  actualiserListe(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    this.changeDetectorRef.markForCheck();

    this.empruntService.consulterEmpruntsEnRetard().subscribe({
      next: (emprunts) => {
        this.empruntsEnRetard = emprunts;
        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des emprunts en retard', erreur);

        this.messageErreur = 'Impossible de charger les emprunts en retard.';

        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  enregistrerRetour(emprunt: EmpruntResponse): void {
    const confirmation = window.confirm(`Confirmer le retour du livre « ${emprunt.titreLivre} » ?`);

    if (!confirmation) {
      return;
    }

    if (emprunt.idEmprunt === null || emprunt.idEmprunt === undefined) {
      this.messageErreur = 'Cet emprunt possède un identifiant invalide.';

      this.changeDetectorRef.markForCheck();
      return;
    }

    if (this.idEmpruntEnCoursDeTraitement === emprunt.idEmprunt) {
      return;
    }

    this.idEmpruntEnCoursDeTraitement = emprunt.idEmprunt;
    this.messageErreur = '';
    this.messageSucces = '';

    this.changeDetectorRef.markForCheck();

    this.empruntService.enregistrerRetour(emprunt.idEmprunt).subscribe({
      next: () => {
        this.messageSucces = `Le retour du livre « ${emprunt.titreLivre} » a été enregistré.`;

        this.idEmpruntEnCoursDeTraitement = null;

        // Recharge la liste : l'emprunt retourné disparaîtra
        // automatiquement des emprunts en retard.
        this.actualiserListe();

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors de l’enregistrement du retour', erreur);

        this.messageErreur =
          erreur.error?.message ??
          erreur.error?.detail ??
          'Impossible d’enregistrer le retour du livre.';

        this.idEmpruntEnCoursDeTraitement = null;

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  retourEnCours(idEmprunt: number): boolean {
    return this.idEmpruntEnCoursDeTraitement === idEmprunt;
  }
}
