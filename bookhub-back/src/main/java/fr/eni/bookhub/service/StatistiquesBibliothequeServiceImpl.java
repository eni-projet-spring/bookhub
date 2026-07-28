package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.dto.LivrePopulaireResponse;
import fr.eni.bookhub.dto.StatistiquesBibliothequeResponse;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.repository.EmpruntRepository;
import fr.eni.bookhub.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class StatistiquesBibliothequeServiceImpl
        implements StatistiquesBibliothequeService {

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
    public StatistiquesBibliothequeResponse obtenirStatistiques() {

        LocalDateTime maintenant = LocalDateTime.now();

        long nombreEmpruntsEnCours =
                empruntRepository.countByDateRetourIsNull();

        long nombreEmpruntsTotal =
                empruntRepository.count();

        long nombreEmpruntsEnRetard =
                empruntRepository
                        .countByDateRetourIsNullAndDateFinPrevueBefore(
                                maintenant
                        );

        long nombreReservationsEnAttente =
                reservationRepository.countByStatut(
                        "EN ATTENTE"
                );

        List<LivrePopulaireResponse> livresPopulaires =
                empruntRepository
                        .rechercherLivresLesPlusEmpruntes()
                        .stream()
                        .map(resultat -> new LivrePopulaireResponse(
                                (Integer) resultat[0],
                                (String) resultat[1],
                                (String) resultat[2],
                                (Long) resultat[3]
                        ))
                        .toList();

        List<EmpruntResponse> empruntsEnRetard =
                empruntRepository
                        .findByDateRetourIsNullAndDateFinPrevueBeforeOrderByDateFinPrevueAsc(
                                maintenant
                        )
                        .stream()
                        .map(emprunt ->
                                convertirEnEmpruntResponse(
                                        emprunt,
                                        maintenant
                                )
                        )
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

        long nombreJoursRetard = ChronoUnit.DAYS.between(
                emprunt.getDateFinPrevue(),
                maintenant
        );

        return new EmpruntResponse(
                emprunt.getIdEmprunt(),

                emprunt.getUtilisateur().getIdUtilisateur(),
                emprunt.getUtilisateur().getNom(),
                emprunt.getUtilisateur().getPrenom(),

                emprunt.getExemplaire()
                        .getLivre()
                        .getIdLivre(),

                emprunt.getExemplaire()
                        .getLivre()
                        .getTitre(),

                emprunt.getExemplaire()
                        .getLivre()
                        .getIsbn(),

                emprunt.getDateDebut(),
                emprunt.getDateFinPrevue(),
                emprunt.getDateRetour(),
                emprunt.getStatut(),

                Math.toIntExact(nombreJoursRetard)
        );
    }
}