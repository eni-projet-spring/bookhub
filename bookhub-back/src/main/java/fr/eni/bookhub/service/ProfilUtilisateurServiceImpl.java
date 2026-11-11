package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.ProfilUtilisateurDTO;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.exception.UtilisateurNotFoundException;
import fr.eni.bookhub.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProfilUtilisateurServiceImpl implements ProfilUtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public ProfilUtilisateurDTO getProfilByEmail(String email) {
        return ProfilUtilisateurDTO.fromEntity(findByEmailOrThrow(email));
    }

    @Override
    @Transactional
    public ProfilUtilisateurDTO editProfil(String email, ProfilUtilisateurDTO dto) {
        Utilisateur utilisateur = findByEmailOrThrow(email);

        utilisateur.setNom(dto.getNom().trim());
        utilisateur.setPrenom(dto.getPrenom().trim());
        // L'email et le rôle ne sont jamais modifiables via cet endpoint.
        if (dto.getMotDePasse() != null && !dto.getMotDePasse().isBlank()) {
            utilisateur.setMotDePasse(passwordEncoder.encode(dto.getMotDePasse()));
        }

        return ProfilUtilisateurDTO.fromEntity(utilisateurRepository.save(utilisateur));
    }

    @Override
    public void deleteProfil(String email) {
        throw new UnsupportedOperationException(
                "Suppression du profil désactivée en attendant les règles de conservation."
        );
    }

    private Utilisateur findByEmailOrThrow(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UtilisateurNotFoundException(
                        "Utilisateur non trouvé : " + email));
    }
}
