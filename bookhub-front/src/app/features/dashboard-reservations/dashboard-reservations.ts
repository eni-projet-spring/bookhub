import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

// @ts-ignore
import { StatistiquesBibliotheque } from '../models/statistiques-bibliotheque.model';
// @ts-ignore
import { StatistiquesBibliothequeService } from "../../services/statistiques-bibliotheque.service";

@Component({
  selector: 'app-dashboard-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-reservations.html',
  styleUrl: './dashboard-reservations.css',
})
export class DashboardReservations implements OnInit {
  private readonly statistiquesService = inject(StatistiquesBibliothequeService);

  statistiques: StatistiquesBibliotheque | null = null;

  chargementEnCours = false;
  messageErreur = '';

  ngOnInit(): void {
    this.chargerStatistiques();
  }

  chargerStatistiques(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    // @ts-ignore
    this.statistiquesService.consulterStatistiques().subscribe({
      next: (statistiques) => {
        this.statistiques = statistiques;
        this.chargementEnCours = false;
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des statistiques', erreur);

        this.messageErreur = 'Impossible de charger les statistiques de la bibliothèque.';

        this.chargementEnCours = false;
      },
    });
  }
}
