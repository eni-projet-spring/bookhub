package fr.eni.bookhub.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentaireResponse {

    private Integer idCommentaire;

    private Integer idLivre;

    private String titreLivre;

    private String auteur;

    private String texte;

    private Integer note;

    private LocalDateTime datePublication;

    private String nomUtilisateur;

    private String prenomUtilisateur;
}