package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.InscriptionUtilisateurDto;
import fr.eni.bookhub.entity.Role;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.exception.IdentifiantsInvalidesException;
import fr.eni.bookhub.repository.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurServiceImpl(
            UtilisateurRepository utilisateurRepository
    ) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public Optional<Utilisateur> rechercherParEmail(String email) {
        return utilisateurRepository.findByEmailIgnoreCase(email);
    }

    @Override
    public Utilisateur connecter(String email, String motDePasse) {

        Utilisateur utilisateur = utilisateurRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new IdentifiantsInvalidesException(
                                "Email ou mot de passe incorrect"
                        )
                );

        if (!utilisateur.getMotDePasse().equals(motDePasse)) {
            throw new IdentifiantsInvalidesException(
                    "Email ou mot de passe incorrect"
            );
        }

        return utilisateur;
    }

    //Vérification de l'email
    // Vérification des mots de passe
    // Création de l'utilisateur
    // Encodage du mot de passe
    // Attribution du rôle
    // Sauvegarde
    @Override
    public Utilisateur inscrire(InscriptionUtilisateurDto inscriptionDto) {

        if (!inscriptionDto.getMotDePasse()
                .equals(inscriptionDto.getConfirmationMotDePasse())) {

            throw new IdentifiantsInvalidesException(
                    "Les mots de passe ne correspondent pas"
            );
        }

        if (utilisateurRepository.existsByEmail(inscriptionDto.getEmail())) {
            throw new IdentifiantsInvalidesException(
                    "Cette adresse email est déjà utilisée"
            );
        }

        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setNom(inscriptionDto.getNom().trim());
        utilisateur.setPrenom(inscriptionDto.getPrenom().trim());
        utilisateur.setEmail(
                inscriptionDto.getEmail().trim().toLowerCase()
        );
        utilisateur.setMotDePasse(inscriptionDto.getMotDePasse());
        utilisateur.setRole(Role.USER);

        return utilisateurRepository.save(utilisateur);
    }
}