package fr.eni.bookhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LivreRequestDTO {

    @NotBlank(message = "L'ISBN est obligatoire")
    @Size(min = 13, max = 13, message = "L'ISBN doit contenir exactement 13 caractères")
    private String isbn;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 100, message = "Le titre ne peut pas dépasser 100 caractères")
    private String titre;

    @NotBlank(message = "La description est obligatoire")
    @Size(max = 400, message = "La description ne peut pas dépasser 400 caractères")
    private String description;

    @Size(max = 255, message = "L'URL de couverture ne peut pas dépasser 255 caractères")
    private String couverture;

    @NotBlank(message = "L'édition est obligatoire")
    @Size(max = 100, message = "L'édition ne peut pas dépasser 100 caractères")
    private String edition;

    @NotBlank(message = "L'auteur est obligatoire")
    @Size(max = 100, message = "L'auteur ne peut pas dépasser 100 caractères")
    private String auteur;

    @NotNull(message = "La catégorie est obligatoire")
    private Integer idCategorie;
}