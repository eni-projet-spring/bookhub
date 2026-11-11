package fr.eni.bookhub.dto;

import java.time.LocalDateTime;

/** Réponse sérialisable : ne divulgue ni mot de passe ni entité JPA. */
public record CommentaireResponse(
        Integer idCommentaire,
        Integer idLivre,
        String isbn,
        String titreLivre,
        String auteurLivre,
        Integer note,
        String texte,
        LocalDateTime datePublication
) {}
