import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReservationResponse } from "../../models/reservation-response";
import { ReservationService } from '../../services/reservation.service';
import { StatistiquesBibliothequeService } from '../../services/statistiques-bibliotheque.service';

@Component({
  selector: 'app-listes-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listes-reservations.html',
  styleUrl: './listes-reservations.css',
})
export class ListesReservations implements OnInit {
  private readonly reservationService = inject(ReservationService);

  private readonly statistiquesService = inject(StatistiquesBibliothequeService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  reservationsEnAttente: ReservationResponse[] = [];

  chargementReservationsEnCours = false;
  messageErreurReservations = '';

  idReservationEnCours: number | null = null;

  ngOnInit(): void {
    this.chargerReservations();
  }

  chargerReservations(): void {
    this.chargementReservationsEnCours = true;
    this.messageErreurReservations = '';

    this.changeDetectorRef.markForCheck();

    this.reservationService.listerReservationsEnAttente().subscribe({
      next: (reservations) => {
        this.reservationsEnAttente = reservations;
        this.chargementReservationsEnCours = false;

        console.log('Réservations en attente :', reservations);

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

  confirmerReservation(idReservation: number): void {
    console.log('ID à confirmer :', idReservation);

    if (idReservation === null || idReservation === undefined) {
      this.messageErreurReservations = 'La réservation possède un identifiant invalide.';

      this.changeDetectorRef.markForCheck();
      return;
    }

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

        this.chargerReservations();
        this.actualiserStatistiques();

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

    if (idReservation === null || idReservation === undefined) {
      this.messageErreurReservations = 'La réservation possède un identifiant invalide.';

      this.changeDetectorRef.markForCheck();
      return;
    }

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

        this.chargerReservations();
        this.actualiserStatistiques();

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

  private actualiserStatistiques(): void {
    this.statistiquesService.consulterStatistiques().subscribe({
      next: () => {
        this.changeDetectorRef.markForCheck();
      },

      error: (erreur) => {
        console.error('Erreur lors de l’actualisation des statistiques', erreur);
      },
    });
  }
}
