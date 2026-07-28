package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.ReservationResponse;
import fr.eni.bookhub.entity.Reservation;
import fr.eni.bookhub.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(
            ReservationService reservationService
    ) {
        this.reservationService = reservationService;
    }

    /**
     * Côté bibliothécaire :
     * récupère toutes les réservations en attente.
     */
    @GetMapping("/en-attente")
    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<List<ReservationResponse>>
    listerReservationsEnAttente() {

        List<ReservationResponse> reservations =
                reservationService
                        .listerReservationsEnAttente()
                        .stream()
                        .map(this::convertirEnResponse)
                        .toList();

        return ResponseEntity.ok(reservations);
    }

    /**
     * Côté lecteur :
     * récupère uniquement les réservations
     * de l'utilisateur connecté grâce au JWT.
     */
    @GetMapping("/mes-reservations")
    public ResponseEntity<List<ReservationResponse>>
    listerMesReservations(
            Authentication authentication
    ) {
        String email = authentication.getName();

        List<ReservationResponse> reservations =
                reservationService
                        .listerReservationsUtilisateurParEmail(email)
                        .stream()
                        .map(this::convertirEnResponse)
                        .toList();

        return ResponseEntity.ok(reservations);
    }

    /**
     * Côté lecteur :
     * réserve un livre pour l'utilisateur connecté.
     */
    @PostMapping
    public ResponseEntity<ReservationResponse> reserverLivre(
            @RequestParam Integer idLivre,
            Authentication authentication
    ) {
        String email = authentication.getName();

        Reservation reservation =
                reservationService.reserverLivreParEmail(
                        email,
                        idLivre
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(convertirEnResponse(reservation));
    }

    /**
     * Côté bibliothécaire :
     * confirme une réservation en attente.
     */
    @PatchMapping("/{idReservation}/confirmer")
    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<ReservationResponse>
    confirmerReservation(
            @PathVariable Integer idReservation
    ) {
        Reservation reservation =
                reservationService
                        .confirmerReservation(idReservation);

        return ResponseEntity.ok(
                convertirEnResponse(reservation)
        );
    }

    /**
     * Côté lecteur :
     * annule une réservation appartenant
     * à l'utilisateur connecté.
     */
    @DeleteMapping("/{idReservation}")
    public ResponseEntity<Void> annulerReservation(
            @PathVariable Integer idReservation,
            Authentication authentication
    ) {
        String email = authentication.getName();

        reservationService.annulerReservationParEmail(
                idReservation,
                email
        );

        return ResponseEntity.noContent().build();
    }

    /**
     * Conversion d'une entité Reservation
     * vers le DTO ReservationResponse.
     */
    private ReservationResponse convertirEnResponse(
            Reservation reservation
    ) {
        return new ReservationResponse(
                reservation.getIdReservation(),
                reservation.getDateDemande(),
                reservation.getStatut(),
                reservation.getDisponibilite(),
                reservation.getPositionFileAttente(),
                reservation.getUtilisateur().getIdUtilisateur(),
                reservation.getLivre().getIdLivre(),
                reservation.getLivre().getTitre(),
                reservation.getLivre().getIsbn()
        );
    }
    @PatchMapping("/{idReservation}/rejeter")
    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<ReservationResponse> rejeterReservation(
            @PathVariable Integer idReservation
    ) {
        Reservation reservation =
                reservationService.rejeterReservation(idReservation);

        return ResponseEntity.ok(
                convertirEnResponse(reservation)
        );
    }
}