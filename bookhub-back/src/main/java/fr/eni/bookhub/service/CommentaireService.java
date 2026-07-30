package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.CommentaireRequest;
import fr.eni.bookhub.dto.CommentaireResponse;

import java.util.List;

public interface CommentaireService {

    CommentaireResponse ajouterCommentaireParEmail(
            String email,
            CommentaireRequest dto
    );

    List<CommentaireResponse> listerCommentairesUtilisateurParEmail(
            String email
    );

    List<CommentaireResponse> listerCommentairesLivre(
            Integer idLivre
    );

    CommentaireResponse modifierCommentaireParEmail(
            Integer idCommentaire,
            String email,
            CommentaireRequest dto
    );

    void supprimerCommentaireParEmail(
            Integer idCommentaire,
            String email
    );
}