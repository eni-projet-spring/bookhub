package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Reservation;
import fr.eni.bookhub.entity.StatutReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository
        extends JpaRepository<Reservation, Integer> {

    long countByStatut(
            StatutReservation statut
    );

    int countByLivreIdLivreAndStatut(
            Integer idLivre,
            StatutReservation statut
    );

    boolean existsByUtilisateurIdUtilisateurAndLivreIdLivreAndStatut(
            Integer idUtilisateur,
            Integer idLivre,
            StatutReservation statut
    );

    List<Reservation> findByStatutOrderByDateDemandeAsc(
            StatutReservation statut
    );

    List<Reservation> findByUtilisateurIdUtilisateurOrderByDateDemandeDesc(
            Integer idUtilisateur
    );

    List<Reservation> findByLivreIdLivreAndStatutOrderByDateDemandeAsc(
            Integer idLivre,
            StatutReservation statut
    );
}