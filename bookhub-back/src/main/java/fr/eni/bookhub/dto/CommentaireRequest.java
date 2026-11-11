package fr.eni.bookhub.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Données acceptées pour la création ou la modification d'un avis. */
public record CommentaireRequest(
        @NotBlank @Size(min = 1, max = 1000) String texte,
        @Min(1) @Max(5) int note
) {}
