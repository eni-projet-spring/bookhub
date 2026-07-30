package fr.eni.bookhub.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentaireRequest {

    @NotNull
    private Integer idLivre;

    @NotBlank
    @Size(max = 1000)
    private String texte;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer note;
}