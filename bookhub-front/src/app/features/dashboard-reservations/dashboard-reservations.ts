import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ReservationResponse } from '../../models/reservation-response';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-reservations.html',
  styleUrl: './dashboard-reservations.css',
})
export class DashboardReservations implements OnInit {
  reservationsEnAttente: ReservationResponse[] = [];

  chargementEnCours = false;
  messageErreur = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.chargerReservationsEnAttente();
  }

  chargerReservationsEnAttente(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    this.reservationService.listerReservationsEnAttente().subscribe({
      next: (reservations) => {
        this.reservationsEnAttente = reservations;
        this.chargementEnCours = false;
      },

      error: (erreur) => {
        console.error('Erreur lors du chargement des réservations :', erreur);

        this.messageErreur = 'Impossible de charger les réservations en attente.';

        this.chargementEnCours = false;
      },
    });
  }
}
