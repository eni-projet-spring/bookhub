package fr.eni.bookhub.service;

import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.entity.Reservation;
import fr.eni.bookhub.entity.StatutReservation;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.repository.LivreRepository;
import fr.eni.bookhub.repository.ReservationRepository;
import fr.eni.bookhub.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final LivreRepository livreRepository;

    public ReservationServiceImpl(
            ReservationRepository reservationRepository,
            UtilisateurRepository utilisateurRepository,
            LivreRepository livreRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.livreRepository = livreRepository;
    }

    @Override
    @Transactional
    public Reservation reserverLivreParEmail(
            String email,
            Integer idLivre
    ) {
        Utilisateur utilisateur = utilisateurRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utilisateur introuvable avec l'email : " + email
                ));

        Livre livre = livreRepository
                .findById(idLivre)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Livre introuvable avec l'identifiant : " + idLivre
                ));

        boolean reservationExistante = reservationRepository
                .existsByUtilisateurIdUtilisateurAndLivreIdLivreAndStatut(
                        utilisateur.getIdUtilisateur(),
                        idLivre,
                        StatutReservation.EN_ATTENTE
                );

        if (reservationExistante) {
            throw new IllegalStateException(
                    "Vous avez déjà réservé ce livre."
            );
        }

        int positionFileAttente = reservationRepository
                .countByLivreIdLivreAndStatut(
                        idLivre,
                        StatutReservation.EN_ATTENTE
                ) + 1;

        Reservation reservation = new Reservation();

        reservation.setUtilisateur(utilisateur);
        reservation.setLivre(livre);
        reservation.setDateDemande(LocalDateTime.now());
        reservation.setStatut(StatutReservation.EN_ATTENTE);
        reservation.setDisponibilite("INDISPONIBLE");
        reservation.setPositionFileAttente(positionFileAttente);

        return reservationRepository.save(reservation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reservation> listerReservationsEnAttente() {
        return reservationRepository
                .findByStatutOrderByDateDemandeAsc(
                        StatutReservation.EN_ATTENTE
                );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reservation> listerReservationsUtilisateurParEmail(
            String email
    ) {
        Utilisateur utilisateur = utilisateurRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utilisateur introuvable avec l'email : " + email
                ));

        return reservationRepository
                .findByUtilisateurIdUtilisateurOrderByDateDemandeDesc(
                        utilisateur.getIdUtilisateur()
                );
    }

    @Override
    @Transactional
    public Reservation confirmerReservation(Integer idReservation) {
        Reservation reservation = rechercherReservation(idReservation);

        if (reservation.getStatut() != StatutReservation.EN_ATTENTE) {
            throw new IllegalStateException(
                    "Seule une réservation en attente peut être confirmée."
            );
        }

        Integer idLivre = reservation
                .getLivre()
                .getIdLivre();

        reservation.setStatut(StatutReservation.DISPONIBLE);
        reservation.setDisponibilite("DISPONIBLE");
        reservation.setPositionFileAttente(null);

        Reservation reservationConfirmee =
                reservationRepository.save(reservation);

        reservationRepository.flush();

        renumeroterFileAttente(idLivre);

        return reservationConfirmee;
    }

    @Override
    @Transactional
    public Reservation rejeterReservation(Integer idReservation) {
        Reservation reservation = rechercherReservation(idReservation);

        if (reservation.getStatut() != StatutReservation.EN_ATTENTE) {
            throw new IllegalStateException(
                    "Seule une réservation en attente peut être rejetée."
            );
        }

        Integer idLivre = reservation
                .getLivre()
                .getIdLivre();

        reservation.setStatut(StatutReservation.ANNULEE);
        reservation.setDisponibilite("INDISPONIBLE");
        reservation.setPositionFileAttente(null);

        Reservation reservationRejetee =
                reservationRepository.save(reservation);

        reservationRepository.flush();

        renumeroterFileAttente(idLivre);

        return reservationRejetee;
    }

    @Override
    @Transactional
    public void annulerReservationParEmail(
            Integer idReservation,
            String email
    ) {
        Reservation reservation = rechercherReservation(idReservation);

        if (!reservation
                .getUtilisateur()
                .getEmail()
                .equalsIgnoreCase(email)) {

            throw new IllegalStateException(
                    "Vous ne pouvez pas annuler la réservation d'un autre utilisateur."
            );
        }

        if (reservation.getStatut() != StatutReservation.EN_ATTENTE) {
            throw new IllegalStateException(
                    "Seule une réservation en attente peut être annulée."
            );
        }

        Integer idLivre = reservation
                .getLivre()
                .getIdLivre();

        reservationRepository.delete(reservation);
        reservationRepository.flush();

        renumeroterFileAttente(idLivre);
    }

    private Reservation rechercherReservation(Integer idReservation) {
        return reservationRepository
                .findById(idReservation)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Réservation introuvable avec l'identifiant : "
                                + idReservation
                ));
    }

    private void renumeroterFileAttente(Integer idLivre) {
        List<Reservation> fileAttente = reservationRepository
                .findByLivreIdLivreAndStatutOrderByDateDemandeAsc(
                        idLivre,
                        StatutReservation.EN_ATTENTE
                );

        for (int index = 0; index < fileAttente.size(); index++) {
            Reservation reservation = fileAttente.get(index);

            reservation.setPositionFileAttente(index + 1);
        }

        reservationRepository.saveAll(fileAttente);
    }
}