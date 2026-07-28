package fr.eni.bookhub.dto;

import java.time.LocalDateTime;

public record EmpruntEnRetardResponse(
        Integer idEmprunt,
        String nomUtilisateur,
        String prenomUtilisateur,
        String titreLivre,
        LocalDateTime dateFinPrevue,
        long nombreJoursRetard
) {
}