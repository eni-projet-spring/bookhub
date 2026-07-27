package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.ProfilUtilisateurDTO;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.exception.UtilisateurNotFoundException;
import fr.eni.bookhub.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProfilUtilisateurServiceImpl implements ProfilUtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    public ProfilUtilisateurDTO getProfilByEmail(String email) {
        Utilisateur utilisateur = findByEmailOrThrow(email);
        return ProfilUtilisateurDTO.fromEntity(utilisateur);
    }

    @Override
    public ProfilUtilisateurDTO editProfil(String email, ProfilUtilisateurDTO dto) {
        Utilisateur utilisateur = findByEmailOrThrow(email);
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        // l'email n'est pas modifiable ici car il sert d'identifiant de connexion
        return ProfilUtilisateurDTO.fromEntity(utilisateurRepository.save(utilisateur));
    }

    @Override
    public void deleteProfil(String email) {
        Utilisateur utilisateur = findByEmailOrThrow(email);
        utilisateurRepository.delete(utilisateur);
    }

    private Utilisateur findByEmailOrThrow(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UtilisateurNotFoundException(
                        "Utilisateur non trouvé : " + email));
    }
}