import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StatistiquesBibliotheque } from '../../models/statistiques-bibliotheque';
import { StatistiquesBibliothequeService } from '../../services/statistiques-bibliotheque.service';

/** Statistiques serveur : aucune valeur de démonstration dans le composant. */
@Component({
  selector: 'app-statistiques-bibliothecaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiques-bibliothecaire.html',
  styleUrl: './dashboard-bibliothecaire.css',
})
export class StatistiquesBibliothecaire implements OnInit {
  private readonly service = inject(StatistiquesBibliothequeService);
  private readonly cdr = inject(ChangeDetectorRef);
  statistiques: StatistiquesBibliotheque | null = null;
  chargement = false;
  erreur = '';

  ngOnInit(): void { this.actualiser(); }
  actualiser(): void {
    this.chargement = true;
    this.erreur = '';
    this.service.consulterStatistiques().subscribe({
      next: (statistiques) => {
        this.statistiques = statistiques;
        this.chargement = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Impossible de charger les statistiques.';
        this.chargement = false;
        this.cdr.markForCheck();
      },
    });
  }
}
