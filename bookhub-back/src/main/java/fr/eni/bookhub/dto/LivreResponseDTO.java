package fr.eni.bookhub.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LivreResponseDTO {

    private Integer idLivre;
    private String isbn;
    private String titre;
    private String description;
    private String couverture;
    private String edition;
    private String auteur;

    private Integer idCategorie;
    private String libelleCategorie;
}