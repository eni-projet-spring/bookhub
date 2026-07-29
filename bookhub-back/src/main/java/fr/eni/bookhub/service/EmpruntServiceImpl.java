package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.entity.StatutEmprunt;
import fr.eni.bookhub.repository.EmpruntRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class EmpruntServiceImpl implements EmpruntService {

    private final EmpruntRepository empruntRepository;

    public EmpruntServiceImpl(
            EmpruntRepository empruntRepository
    ) {
        this.empruntRepository = empruntRepository;
    }

    @Override
    public List<EmpruntResponse> rechercherEmpruntsParUtilisateur(
            Integer idUtilisateur
    ) {
        LocalDateTime maintenant = LocalDateTime.now();

        return empruntRepository
                .findByUtilisateurIdUtilisateurOrderByDateDebutDesc(
                        idUtilisateur
                )
                .stream()
                .map(emprunt ->
                        convertirEnResponse(
                                emprunt,
                                maintenant
                        )
                )
                .toList();
    }

    @Override
    public List<EmpruntResponse> consulterEmpruntsEnRetard() {
        LocalDateTime maintenant = LocalDateTime.now();

        return empruntRepository
                .findByDateRetourIsNullAndDateFinPrevueBeforeOrderByDateFinPrevueAsc(
                        maintenant
                )
                .stream()
                .map(emprunt ->
                        convertirEnResponse(
                                emprunt,
                                maintenant
                        )
                )
                .toList();
    }

    @Override
    public List<EmpruntResponse> consulterMesEmprunts(
            String emailUtilisateur
    ) {
        LocalDateTime maintenant = LocalDateTime.now();

        return empruntRepository
                .findByUtilisateurEmailOrderByDateDebutDesc(
                        emailUtilisateur
                )
                .stream()
                .map(emprunt ->
                        convertirEnResponse(
                                emprunt,
                                maintenant
                        )
                )
                .toList();
    }

    private EmpruntResponse convertirEnResponse(
            Emprunt emprunt,
            LocalDateTime maintenant
    ) {
        return new EmpruntResponse(
                emprunt.getIdEmprunt(),
                emprunt.getUtilisateur().getNom(),
                emprunt.getUtilisateur().getPrenom(),
                emprunt.getExemplaire().getLivre().getTitre(),
                emprunt.getExemplaire().getLivre().getIsbn(),
                emprunt.getDateDebut(),
                emprunt.getDateFinPrevue(),
                emprunt.getDateRetour(),
                determinerStatut(
                        emprunt,
                        maintenant
                ),
                calculerNombreJoursRetard(
                        emprunt,
                        maintenant
                )
        );
    }

    private StatutEmprunt determinerStatut(
            Emprunt emprunt,
            LocalDateTime maintenant
    ) {
        if (emprunt.getDateRetour() != null) {
            return StatutEmprunt.RETOURNE;
        }

        if (
                emprunt.getDateFinPrevue() != null
                        && emprunt.getDateFinPrevue().isBefore(maintenant)
        ) {
            return StatutEmprunt.EN_RETARD;
        }

        return StatutEmprunt.EN_COURS;
    }

    private long calculerNombreJoursRetard(
            Emprunt emprunt,
            LocalDateTime maintenant
    ) {
        if (
                emprunt.getDateRetour() != null
                        || emprunt.getDateFinPrevue() == null
                        || !emprunt.getDateFinPrevue().isBefore(maintenant)
        ) {
            return 0;
        }

        return Duration.between(
                emprunt.getDateFinPrevue(),
                maintenant
        ).toDays();
    }
}