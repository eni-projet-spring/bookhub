import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { StatistiquesBibliotheque } from '../../models/statistiques-bibliotheque';
import { StatistiquesBibliothequeService } from '../../services/statistiques-bibliotheque.service';
import { ReservationResponse } from '../../models/reservation-response';
@Component({
  selector: 'app-dashboard-bibliothecaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-bibliothecaire.html',
  styleUrl: './dashboard-bibliothecaire.css',
})
export class DashboardBibliothecaire implements OnInit {
  private readonly statistiquesService = inject(StatistiquesBibliothequeService);

  statistiques: StatistiquesBibliotheque | null = null;

  chargementEnCours = false;
  messageErreur = '';

  reservationsEnAttente: ReservationResponse[] = [];

  chargementReservationsEnCours = false;
  messageErreurReservations = '';
  traitementEnCours = false;

  ngOnInit(): void {
    this.chargerStatistiques();
    this.actualiserDashboard();
  }

  chargerStatistiques(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

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

  actualiserDashboard(): void {
    this.chargementReservationsEnCours = true;
    this.messageErreurReservations = '';

    // À remplacer ensuite par l’appel au ReservationService.
    this.reservationsEnAttente = [];

    this.chargementReservationsEnCours = false;
  }

  confirmerReservation(idReservation: number): void {
    console.log('Confirmation de la réservation', idReservation);
  }

  rejeterReservation(idReservation: number): void {
    console.log('Rejet de la réservation', idReservation);
  }
}
