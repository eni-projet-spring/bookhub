import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StatistiquesBibliotheque } from '../../models/statistiques-bibliotheque';
import { ReservationResponse } from '../../models/reservation-response';

import { StatistiquesBibliothequeService } from '../../services/statistiques-bibliotheque.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-dashboard-bibliothecaire',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-bibliothecaire.html',
  styleUrl: './dashboard-bibliothecaire.css',
})
export class DashboardBibliothecaire implements OnInit {
  private readonly statistiquesService = inject(StatistiquesBibliothequeService);

  private readonly reservationService = inject(ReservationService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  statistiques: StatistiquesBibliotheque | null = null;

  chargementEnCours = false;
  messageErreur = '';

  reservationsEnAttente: ReservationResponse[] = [];

  chargementReservationsEnCours = false;
  messageErreurReservations = '';

  // Identifiant de la réservation actuellement traitée.
  idReservationEnCours: number | null = null;

  ngOnInit(): void {
    this.chargerStatistiques();
    this.actualiserDashboard();
  }

  chargerStatistiques(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    this.changeDetectorRef.markForCheck();

    this.statistiquesService.consulterStatistiques().subscribe({
      next: (statistiques) => {
        this.statistiques = statistiques;
        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des statistiques', erreur);

        this.messageErreur = 'Impossible de charger les statistiques de la bibliothèque.';

        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  confirmerReservation(idReservation: number): void {
    console.log('ID à confirmer :', idReservation);

    // L'identifiant 0 existe dans la base.
    if (idReservation === null || idReservation === undefined) {
      this.messageErreurReservations = 'La réservation possède un identifiant invalide.';

      this.changeDetectorRef.markForCheck();
      return;
    }

    // Empêche un double clic sur la même réservation.
    if (this.idReservationEnCours === idReservation) {
      return;
    }

    this.idReservationEnCours = idReservation;
    this.messageErreurReservations = '';

    this.changeDetectorRef.markForCheck();

    this.reservationService.confirmerReservation(idReservation).subscribe({
      next: (reservationConfirmee) => {
        console.log('Réservation confirmée :', reservationConfirmee);

        this.idReservationEnCours = null;

        this.actualiserDashboard();
        this.chargerStatistiques();

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors de la confirmation de la réservation', erreur);

        this.messageErreurReservations =
          erreur.error?.message ??
          erreur.error?.detail ??
          'Impossible de confirmer la réservation.';

        this.idReservationEnCours = null;

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  rejeterReservation(idReservation: number): void {
    console.log('ID à rejeter :', idReservation);

    // L'identifiant 0 existe dans la base.
    if (idReservation === null || idReservation === undefined) {
      this.messageErreurReservations = 'La réservation possède un identifiant invalide.';

      this.changeDetectorRef.markForCheck();
      return;
    }

    // Empêche un double clic sur la même réservation.
    if (this.idReservationEnCours === idReservation) {
      return;
    }

    this.idReservationEnCours = idReservation;
    this.messageErreurReservations = '';

    this.changeDetectorRef.markForCheck();

    this.reservationService.rejeterReservation(idReservation).subscribe({
      next: (reservationRejetee) => {
        console.log('Réservation rejetée :', reservationRejetee);

        this.idReservationEnCours = null;

        this.actualiserDashboard();
        this.chargerStatistiques();

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors du rejet de la réservation', erreur);

        this.messageErreurReservations =
          erreur.error?.message ?? erreur.error?.detail ?? 'Impossible de rejeter la réservation.';

        this.idReservationEnCours = null;

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  actualiserDashboard(): void {
    this.chargementReservationsEnCours = true;
    this.messageErreurReservations = '';

    this.changeDetectorRef.markForCheck();

    this.reservationService.listerReservationsEnAttente().subscribe({
      next: (reservations) => {
        this.reservationsEnAttente = reservations;
        this.chargementReservationsEnCours = false;

        console.log('Réservations en attente :', reservations);

        reservations.forEach((reservation) => {
          console.log('Réservation :', reservation.idReservation, reservation.titreLivre);
        });

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des réservations', erreur);

        this.messageErreurReservations = 'Impossible de charger les réservations en attente.';

        this.chargementReservationsEnCours = false;

        this.changeDetectorRef.markForCheck();
      },
    });
  }
}
