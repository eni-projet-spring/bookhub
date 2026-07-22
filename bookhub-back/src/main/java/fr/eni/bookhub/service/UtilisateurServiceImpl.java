package fr.eni.bookhub.service;

import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.exception.IdentifiantsInvalidesException;
import fr.eni.bookhub.repository.UtilisateurRepository;
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
        return utilisateurRepository.findByEmail(email);
    }

    @Override
    public Utilisateur connecter(String email, String motDePasse) {

        Utilisateur utilisateur = utilisateurRepository
                .findByEmail(email)
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
}