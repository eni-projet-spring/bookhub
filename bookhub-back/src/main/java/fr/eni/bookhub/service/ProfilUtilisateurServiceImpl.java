package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.ProfilUtilisateurDTO;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.repository.UtilisateurRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProfilUtilisateurServiceImpl implements ProfilUtilisateurService {
    @NonNull
    private final UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur getProfilUtilisateurById(Integer idUtilisateur) {
        Optional<Utilisateur> utilisateurOptional = utilisateurRepository.findById(idUtilisateur);
        if(utilisateurOptional.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + idUtilisateur);
        }
        return utilisateurOptional.get();
    }

    @Override
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Override
    public Utilisateur editUtilisateur(Integer idUtilisateur, ProfilUtilisateurDTO dto) {

        Utilisateur utilisateur = utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur non trouvé avec l'ID : " + idUtilisateur));

        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());

        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public Utilisateur deleteUtilisateurById(Integer idUtilisateur) {
        return null;
    }




}