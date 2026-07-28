package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.StatutEmprunt;

import java.time.LocalDateTime;

public record EmpruntResponse(

        Integer idEmprunt,

        String titreLivre,

        String isbn,

        String nomUtilisateur,

        LocalDateTime dateDebut,

        LocalDateTime dateFinPrevue,

        LocalDateTime dateRetour,

        StatutEmprunt statut

) {
}