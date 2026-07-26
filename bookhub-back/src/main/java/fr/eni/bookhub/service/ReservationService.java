package fr.eni.bookhub.service;

import fr.eni.bookhub.entity.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation reserverLivreParEmail(
            String email,
            Integer idLivre
    );

    List<Reservation> listerReservationsEnAttente();

    List<Reservation> listerReservationsUtilisateurParEmail(
            String email
    );

    Reservation confirmerReservation(
            Integer idReservation
    );
    void annulerReservationParEmail(
            Integer idReservation,
            String email
    );

}
