import { Component, OnInit } from '@angular/core';
import { ReservationResponse } from '../../models/reservation-response';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-mes-reservations',
  standalone: true,
  imports: [],
  templateUrl: './mes-reservations.html',
  styleUrl: './mes-reservations.css',
})
export class MesReservations implements OnInit {
  mesReservations: ReservationResponse[] = [];

  chargementEnCours = false;
  messageErreur = '';
  messageSucces = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.chargerReservations();
  }

  chargerReservations(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    this.reservationService.listerMesReservations().subscribe({
      next: (reservations) => {
        this.mesReservations = reservations;
        this.chargementEnCours = false;
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des réservations :', erreur);

        this.messageErreur = 'Impossible de charger vos réservations.';

        this.chargementEnCours = false;
      },
    });
  }

  annulerReservation(idReservation: number): void {
    this.messageErreur = '';
    this.messageSucces = '';

    this.reservationService.annulerReservation(idReservation).subscribe({
      next: () => {
        this.messageSucces = 'Votre réservation a bien été annulée.';

        this.chargerReservations();
      },

      error: (erreur) => {
        console.error("Erreur lors de l'annulation de la réservation :", erreur);

        this.messageErreur = "Impossible d'annuler la réservation.";
      },
    });
  }
}
