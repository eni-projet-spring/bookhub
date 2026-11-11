package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.dto.LivrePopulaireResponse;
import fr.eni.bookhub.dto.StatistiquesBibliothequeResponse;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.entity.StatutEmprunt;
import fr.eni.bookhub.entity.StatutReservation;
import fr.eni.bookhub.repository.EmpruntRepository;
import fr.eni.bookhub.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class StatistiquesBibliothequeServiceImpl
        implements StatistiquesBibliothequeService {

    private static final int LIMITE_LIVRES_POPULAIRES = 5;

    private final EmpruntRepository empruntRepository;
    private final ReservationRepository reservationRepository;

    public StatistiquesBibliothequeServiceImpl(
            EmpruntRepository empruntRepository,
            ReservationRepository reservationRepository
    ) {
        this.empruntRepository = empruntRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public StatistiquesBibliothequeResponse consulterStatistiques() {
        LocalDateTime maintenant = LocalDateTime.now();

        long nombreEmpruntsEnCours =
                empruntRepository.countByDateRetourIsNull();

        long nombreEmpruntsTotal = empruntRepository.count();

        long nombreEmpruntsEnRetard =
                empruntRepository.countByDateRetourIsNullAndDateFinPrevueBefore(
                        maintenant
                );

        long nombreReservationsEnAttente =
                reservationRepository.countByStatut(StatutReservation.EN_ATTENTE);

        List<LivrePopulaireResponse> livresPopulaires =
                empruntRepository.rechercherLivresLesPlusEmpruntes()
                        .stream()
                        .limit(LIMITE_LIVRES_POPULAIRES)
                        .map(resultat -> new LivrePopulaireResponse(
                                ((Number) resultat[0]).longValue(),
                                (String) resultat[1],
                                (String) resultat[2],
                                ((Number) resultat[3]).longValue()
                        ))
                        .toList();

        List<EmpruntResponse> empruntsEnRetard =
                empruntRepository
                        .findByDateRetourIsNullAndDateFinPrevueBeforeOrderByDateFinPrevueAsc(
                                maintenant
                        )
                        .stream()
                        .map(emprunt -> convertirEnEmpruntResponse(emprunt, maintenant))
                        .toList();

        return new StatistiquesBibliothequeResponse(
                nombreEmpruntsEnCours,
                nombreEmpruntsTotal,
                nombreEmpruntsEnRetard,
                nombreReservationsEnAttente,
                livresPopulaires,
                empruntsEnRetard
        );
    }

    private EmpruntResponse convertirEnEmpruntResponse(
            Emprunt emprunt,
            LocalDateTime maintenant
    ) {
        Livre livre = emprunt.getExemplaire().getLivre();

        // La requête ne sélectionne que les emprunts non rendus et échus.
        // Ne jamais exposer un nombre de jours négatif.
        long nombreJoursRetard = Math.max(
                0,
                ChronoUnit.DAYS.between(emprunt.getDateFinPrevue(), maintenant)
        );

        return new EmpruntResponse(
                emprunt.getIdEmprunt(),
                emprunt.getUtilisateur().getNom(),
                emprunt.getUtilisateur().getPrenom(),
                livre.getTitre(),
                livre.getIsbn(),
                emprunt.getDateDebut(),
                emprunt.getDateFinPrevue(),
                emprunt.getDateRetour(),
                StatutEmprunt.EN_RETARD,
                nombreJoursRetard,
                livre.getAuteur(),
                livre.getCouverture()
        );
    }
}
