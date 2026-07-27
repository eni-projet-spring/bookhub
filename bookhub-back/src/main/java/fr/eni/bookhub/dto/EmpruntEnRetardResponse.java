package fr.eni.bookhub.dto;

import java.time.LocalDate;

public record EmpruntEnRetardResponse(
        Long idEmprunt,
        String nomUtilisateur,
        String prenomUtilisateur,
        String titreLivre,
        LocalDate dateRetourPrevue,
        long nombreJoursRetard
) {
}