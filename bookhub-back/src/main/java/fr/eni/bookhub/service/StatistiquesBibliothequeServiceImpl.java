package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.EmpruntEnRetardResponse;
import fr.eni.bookhub.dto.LivrePopulaireResponse;
import fr.eni.bookhub.dto.StatistiquesBibliothequeResponse;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.entity.StatutReservation;
import fr.eni.bookhub.repository.EmpruntRepository;
import fr.eni.bookhub.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public StatistiquesBibliothequeResponse consulterStatistiques() {

        LocalDate aujourdHui = LocalDate.now();

        long nombreEmpruntsEnCours =
                empruntRepository.countByDateRetourReelleIsNull();

        long nombreEmpruntsTotal =
                empruntRepository.count();

        long nombreEmpruntsEnRetard =
                empruntRepository
                        .countByDateRetourReelleIsNullAndDateRetourPrevueBefore(
                                aujourdHui
                        );

        long nombreReservationsEnAttente =
                reservationRepositorygit add ..countByStatut(
                        StatutReservation.EN_ATTENTE
                );

        List<LivrePopulaireResponse> livresPopulaires =
                empruntRepository
                        .rechercherLivresLesPlusEmpruntes()
                        .stream()
                        .limit(5)
                        .map(resultat -> new LivrePopulaireResponse(
                                (Long) resultat[0],
                                (String) resultat[1],
                                (String) resultat[2],
                                (Long) resultat[3]
                        ))
                        .toList();

        List<EmpruntEnRetardResponse> empruntsEnRetard =
                empruntRepository
                        .findByDateRetourReelleIsNullAndDateRetourPrevueBeforeOrderByDateRetourPrevueAsc(
                                aujourdHui
                        )
                        .stream()
                        .map(emprunt -> convertirEnEmpruntEnRetard(
                                emprunt,
                                aujourdHui
                        ))
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

    private EmpruntEnRetardResponse convertirEnEmpruntEnRetard(
            Emprunt emprunt,
            LocalDate aujourdHui
    ) {
        long nombreJoursRetard = ChronoUnit.DAYS.between(
                emprunt.getDateRetourPrevue(),
                aujourdHui
        );

        return new EmpruntEnRetardResponse(
                emprunt.getIdEmprunt(),
                emprunt.getUtilisateur().getNom(),
                emprunt.getUtilisateur().getPrenom(),
                emprunt.getExemplaire().getLivre().getTitre(),
                emprunt.getDateRetourPrevue(),
                nombreJoursRetard
        );
    }
}