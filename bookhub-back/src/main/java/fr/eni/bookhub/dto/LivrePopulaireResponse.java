package fr.eni.bookhub.dto;

public record LivrePopulaireResponse(
        Long idLivre,
        String titre,
        String auteur,
        long nombreEmprunts
) {
}