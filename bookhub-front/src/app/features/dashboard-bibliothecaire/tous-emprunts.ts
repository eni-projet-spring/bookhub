import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpruntResponse } from '../../models/emprunt-response';
import { EmpruntService } from '../../services/emprunt-service';

/** Vue globale des emprunts, sans liste fictive ni données saisies en dur. */
@Component({
  selector: 'app-tous-emprunts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tous-emprunts.html',
  styleUrl: './tous-emprunts.css',
})
export class TousEmprunts implements OnInit {
  private readonly service = inject(EmpruntService);
  private readonly cdr = inject(ChangeDetectorRef);
  emprunts: EmpruntResponse[] = [];
  filtre = 'TOUS';
  recherche = '';
  chargement = true;
  erreur = '';
  messageSucces = '';
  retourEnCours: number | null = null;

  ngOnInit(): void { this.actualiser(); }

  actualiser(): void {
    this.chargement = true;
    this.erreur = '';
    this.service.consulterTousLesEmprunts().subscribe({
      next: (emprunts) => {
        this.emprunts = emprunts;
        this.chargement = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Impossible de charger les emprunts de la bibliothèque.';
        this.chargement = false;
        this.cdr.markForCheck();
      },
    });
  }

  get empruntsFiltres(): EmpruntResponse[] {
    const terme = this.recherche.trim().toLocaleLowerCase('fr');
    return this.emprunts.filter((emprunt) => {
      const bonStatut = this.filtre === 'TOUS' || emprunt.statut === this.filtre;
      const texte = [emprunt.titreLivre, emprunt.auteurLivre, emprunt.nomUtilisateur,
        emprunt.prenomUtilisateur, emprunt.isbn].join(' ').toLocaleLowerCase('fr');
      return bonStatut && (!terme || texte.includes(terme));
    });
  }

  /** L'enregistrement d'un retour met également à jour le statut de l'exemplaire côté serveur. */
  enregistrerRetour(emprunt: EmpruntResponse): void {
    if (this.retourEnCours !== null || emprunt.statut === 'RETOURNE') return;
    if (!window.confirm(`Enregistrer le retour de « ${emprunt.titreLivre} » ?`)) return;
    this.retourEnCours = emprunt.idEmprunt;
    this.erreur = '';
    this.messageSucces = '';
    this.service.enregistrerRetour(emprunt.idEmprunt).subscribe({
      next: () => {
        this.retourEnCours = null;
        this.messageSucces = `Retour de « ${emprunt.titreLivre} » enregistré.`;
        this.actualiser();
      },
      error: () => {
        this.retourEnCours = null;
        this.erreur = "Le retour n'a pas pu être enregistré.";
        this.cdr.markForCheck();
      },
    });
  }
}
