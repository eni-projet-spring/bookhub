package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.InscriptionUtilisateurDto;
import fr.eni.bookhub.dto.UtilisateurResponse;
import fr.eni.bookhub.entity.Role;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.exception.IdentifiantsInvalidesException;
import fr.eni.bookhub.repository.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurServiceImpl(
            UtilisateurRepository utilisateurRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<Utilisateur> rechercherParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    @Override
    public Utilisateur connecter(String email, String motDePasse) {

        Utilisateur utilisateur = utilisateurRepository
                .findByEmail(email.trim().toLowerCase())
                .orElseThrow(() ->
                        new IdentifiantsInvalidesException(
                                "Email ou mot de passe incorrect"
                        )
                );

        if (!passwordEncoder.matches(
                motDePasse,
                utilisateur.getMotDePasse()
        )) {
            throw new IdentifiantsInvalidesException(
                    "Email ou mot de passe incorrect"
            );
        }

        return utilisateur;
    }

    @Override
    public Utilisateur inscrire(
            InscriptionUtilisateurDto inscriptionDto
    ) {

        if (!inscriptionDto.getMotDePasse()
                .equals(inscriptionDto.getConfirmationMotDePasse())) {

            throw new IdentifiantsInvalidesException(
                    "Les mots de passe ne correspondent pas"
            );
        }

        String email = inscriptionDto
                .getEmail()
                .trim()
                .toLowerCase();

        if (utilisateurRepository.existsByEmail(email)) {
            throw new IdentifiantsInvalidesException(
                    "Cette adresse email est déjà utilisée"
            );
        }

        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setNom(
                inscriptionDto.getNom().trim()
        );

        utilisateur.setPrenom(
                inscriptionDto.getPrenom().trim()
        );

        utilisateur.setEmail(email);

        utilisateur.setMotDePasse(
                passwordEncoder.encode(
                        inscriptionDto.getMotDePasse()
                )
        );

        utilisateur.setRole(Role.USER);

        return utilisateurRepository.save(utilisateur);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UtilisateurResponse> listerUtilisateurs() {

        return utilisateurRepository
                .findAll()
                .stream()
                .map(this::versUtilisateurResponse)
                .toList();
    }

    private UtilisateurResponse versUtilisateurResponse(
            Utilisateur utilisateur
    ) {
        return new UtilisateurResponse(
                utilisateur.getIdUtilisateur(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole()
        );
    }
}