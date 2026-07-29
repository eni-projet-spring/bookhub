package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntResponse;

import java.util.List;

public interface EmpruntService {

    List<EmpruntResponse> rechercherEmpruntsParUtilisateur(
            Integer idUtilisateur
    );

    List<EmpruntResponse> consulterEmpruntsEnRetard();

    List<EmpruntResponse> consulterMesEmprunts(
            String emailUtilisateur
    );
}