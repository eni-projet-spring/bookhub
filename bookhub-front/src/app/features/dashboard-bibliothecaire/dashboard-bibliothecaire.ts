import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatistiquesBibliotheque } from '../../models/statistiques-bibliotheque';
import { StatistiquesBibliothequeService } from '../../services/statistiques-bibliotheque.service';

/** Accueil bibliothécaire : indicateurs réels et accès rapide aux écrans dédiés. */
@Component({
  selector: 'app-dashboard-bibliothecaire',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-bibliothecaire.html',
  styleUrls: [
    '../dashboard-lecteur/dashboard-lecteur-accueil/dashboard-lecteur-accueil.css',
    './dashboard-bibliothecaire.css',
  ],
})
export class DashboardBibliothecaire implements OnInit {
  private readonly service = inject(StatistiquesBibliothequeService);
  private readonly cdr = inject(ChangeDetectorRef);
  statistiques: StatistiquesBibliotheque | null = null;
  chargementEnCours = false;
  messageErreur = '';

  ngOnInit(): void { this.chargerStatistiques(); }

  chargerStatistiques(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';
    this.service.consulterStatistiques().subscribe({
      next: statistiques => {
        this.statistiques = statistiques;
        this.chargementEnCours = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageErreur = 'Impossible de charger les statistiques de la bibliothèque.';
        this.chargementEnCours = false;
        this.cdr.markForCheck();
      },
    });
  }
}
