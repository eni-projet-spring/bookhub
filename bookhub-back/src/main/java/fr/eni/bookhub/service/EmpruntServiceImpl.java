package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.entity.Exemplaire;
import fr.eni.bookhub.entity.StatutEmprunt;
import fr.eni.bookhub.entity.StatutExemplaire;
import fr.eni.bookhub.repository.EmpruntRepository;
import jakarta.persistence.EntityNotFoundException;
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
                ),
                emprunt.getExemplaire().getLivre().getAuteur(),
                emprunt.getExemplaire().getLivre().getCouverture()
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

    @Override
    @Transactional
    public void enregistrerRetour(Integer idEmprunt) {

        Emprunt emprunt = empruntRepository
                .findById(idEmprunt)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Aucun emprunt trouvé avec l'identifiant "
                                        + idEmprunt
                        )
                );

        /*
         * On empêche d'enregistrer deux fois le retour
         * du même exemplaire.
         */
        if (
                emprunt.getDateRetour() != null
                        || emprunt.getStatut() == StatutEmprunt.RETOURNE
        ) {
            throw new IllegalStateException(
                    "Le retour de cet emprunt a déjà été enregistré."
            );
        }

        /*
         * Mise à jour de l'emprunt.
         */
        emprunt.setDateRetour(LocalDateTime.now());
        emprunt.setStatut(StatutEmprunt.RETOURNE);

        /*
         * Mise à jour de l'exemplaire associé.
         */
        Exemplaire exemplaire = emprunt.getExemplaire();

        if (exemplaire == null) {
            throw new IllegalStateException(
                    "Aucun exemplaire n'est associé à cet emprunt."
            );
        }

        exemplaire.setStatut(StatutExemplaire.DISPONIBLE);

        /*
         * Avec @Transactional, Hibernate sauvegarde automatiquement
         * les modifications apportées aux entités gérées.
         *
         * Le save est donc facultatif, mais il rend l'intention claire.
         */
        empruntRepository.save(emprunt);
    }
}