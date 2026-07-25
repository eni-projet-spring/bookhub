package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.Role;

public record ConnexionResponse(
        String token,
        Integer idUtilisateur,
        String nom,
        String prenom,
        String email,
        Role role
) {
}
