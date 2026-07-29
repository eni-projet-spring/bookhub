package fr.eni.bookhub.dto;

import java.util.List;

public record StatistiquesBibliothequeResponse(
        long nombreEmpruntsEnCours,
        long nombreEmpruntsTotal,
        long nombreEmpruntsEnRetard,
        long nombreReservationsEnAttente,
        List<LivrePopulaireResponse> livresPopulaires,
        List<EmpruntEnRetardResponse> empruntsEnRetard
) {
}