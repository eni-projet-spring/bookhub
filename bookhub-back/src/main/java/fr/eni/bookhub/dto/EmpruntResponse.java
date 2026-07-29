package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.StatutEmprunt;

import java.time.LocalDateTime;

public record EmpruntResponse(
        Integer idEmprunt,
        String nomUtilisateur,
        String prenomUtilisateur,
        String titreLivre,
        String isbn,
        LocalDateTime dateDebut,
        LocalDateTime dateFinPrevue,
        LocalDateTime dateRetour,
        StatutEmprunt statut,
        long nombreJoursRetard
) {
}