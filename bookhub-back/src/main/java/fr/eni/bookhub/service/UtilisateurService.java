package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.InscriptionUtilisateurDto;
import fr.eni.bookhub.entity.Utilisateur;
import jakarta.validation.Valid;

import java.util.Optional;

public interface UtilisateurService {

    /**
     * Recherche un utilisateur à partir de son adresse email.
     */
    Optional<Utilisateur> rechercherParEmail(String email);

    /**
     * Vérifie l'email et le mot de passe d'un utilisateur.
     *
     * @return l'utilisateur connecté
     */
    Utilisateur connecter(String email, String motDePasse);
    Utilisateur inscrire(InscriptionUtilisateurDto inscriptionDto);
}
