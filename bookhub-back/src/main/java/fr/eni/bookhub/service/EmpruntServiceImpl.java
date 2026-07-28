package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.repository.EmpruntRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmpruntServiceImpl implements EmpruntService {

    private final EmpruntRepository empruntRepository;

    public EmpruntServiceImpl(
            EmpruntRepository empruntRepository
    ) {
        this.empruntRepository = empruntRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmpruntResponse> rechercherEmpruntsParUtilisateur(
            Integer idUtilisateur
    ) {
        return empruntRepository
                .findByUtilisateurIdUtilisateurOrderByDateDebutDesc(
                        idUtilisateur
                )
                .stream()
                .map(this::convertirEnResponse)
                .toList();
    }

    private EmpruntResponse convertirEnResponse(
            Emprunt emprunt
    ) {
        Livre livre = emprunt
                .getExemplaire()
                .getLivre();

        return new EmpruntResponse(
                emprunt.getIdEmprunt(),
                livre.getTitre(),
                livre.getAuteur(),
                livre.getIsbn(),
                emprunt.getDateDebut(),
                emprunt.getDateFinPrevue(),
                emprunt.getDateRetour(),
                emprunt.getStatut()
        );
    }
}