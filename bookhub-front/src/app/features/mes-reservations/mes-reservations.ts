import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { ReservationResponse } from '../../models/reservation-response';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-mes-listes-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-reservations.html',
  styleUrl: './mes-reservations.css',
})
export class MesReservations implements OnInit {
  private readonly reservationService = inject(ReservationService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  mesReservations: ReservationResponse[] = [];

  chargementEnCours = false;
  idReservationEnCours: number | null = null;

  messageErreur = '';
  messageSucces = '';

  ngOnInit(): void {
    this.chargerReservations();
  }

  chargerReservations(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    this.reservationService.listerMesReservations().subscribe({
      next: (reservations: ReservationResponse[]) => {
        console.log('Réservations utilisateur reçues :', reservations);

        this.mesReservations = reservations;
        this.chargementEnCours = false;

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des réservations :', erreur);

        if (erreur.status === 401) {
          this.messageErreur = 'Votre session a expiré. Veuillez vous reconnecter.';
        } else if (erreur.status === 403) {
          this.messageErreur = 'Vous n’êtes pas autorisé à consulter ces réservations.';
        } else if (erreur.status === 0) {
          this.messageErreur = 'Impossible de contacter le serveur BookHub.';
        } else {
          this.messageErreur = 'Impossible de charger vos réservations.';
        }

        this.chargementEnCours = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  annulerReservation(idReservation: number): void {
    if (this.idReservationEnCours !== null) {
      return;
    }

    const confirmation = window.confirm('Voulez-vous vraiment annuler cette réservation ?');

    if (!confirmation) {
      return;
    }

    this.messageErreur = '';
    this.messageSucces = '';
    this.idReservationEnCours = idReservation;

    this.reservationService.annulerReservation(idReservation).subscribe({
      next: () => {
        this.messageSucces = 'Votre réservation a bien été annulée.';

        this.idReservationEnCours = null;
        this.chargerReservations();

        this.changeDetectorRef.markForCheck();
      },

      error: (erreur: HttpErrorResponse) => {
        console.error('Erreur lors de l’annulation de la réservation :', erreur);

        if (erreur.status === 401) {
          this.messageErreur = 'Votre session a expiré. Veuillez vous reconnecter.';
        } else if (erreur.status === 403) {
          this.messageErreur = 'Vous ne pouvez pas annuler cette réservation.';
        } else if (erreur.status === 404) {
          this.messageErreur = 'Cette réservation est introuvable.';
        } else {
          this.messageErreur = 'Impossible d’annuler la réservation.';
        }

        this.idReservationEnCours = null;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  libelleStatut(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'En attente de confirmation';

      case 'CONFIRMEE':
        return 'Confirmée';

      case 'REJETEE':
        return 'Rejetée';

      case 'ANNULEE':
        return 'Annulée';

      default:
        return statut;
    }
  }
}
