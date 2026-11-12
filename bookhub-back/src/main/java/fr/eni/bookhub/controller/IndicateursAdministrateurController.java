package fr.eni.bookhub.controller;

import fr.eni.bookhub.entity.Commentaire;
import fr.eni.bookhub.entity.Reservation;
import fr.eni.bookhub.repository.CommentaireRepository;
import fr.eni.bookhub.repository.ReservationRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Statistiques d'administration réelles : aucune valeur de démonstration en dur.
 * Les réservations incluent tous les statuts (volume historique de demandes).
 * Les notes proviennent des avis publiés par les lecteurs.
 */
@RestController
@RequestMapping("/api/admin/indicateurs")
@PreAuthorize("hasRole('ADMIN')")
public class IndicateursAdministrateurController {
    private final ReservationRepository reservationRepository;
    private final CommentaireRepository commentaireRepository;

    public IndicateursAdministrateurController(
            ReservationRepository reservationRepository,
            CommentaireRepository commentaireRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.commentaireRepository = commentaireRepository;
    }

    public record LivreReserve(String titre, long nombreReservations) {}
    public record CategorieAppreciee(String categorie, double noteMoyenne, long nombreAvis) {}
    public record Indicateurs(List<LivreReserve> livresLesPlusReserves,
                              List<CategorieAppreciee> categoriesLesMieuxNotees) {}

    @GetMapping
    @Transactional(readOnly = true)
    public Indicateurs consulter() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<Commentaire> commentaires = commentaireRepository.findAll();

        List<LivreReserve> livres = reservations.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getLivre().getTitre(), Collectors.counting()))
                .entrySet().stream()
                .map(e -> new LivreReserve(e.getKey(), e.getValue()))
                .sorted(Comparator.comparingLong(LivreReserve::nombreReservations)
                        .reversed().thenComparing(LivreReserve::titre))
                .limit(5)
                .toList();

        Map<String, List<Commentaire>> parCategorie = commentaires.stream()
                .collect(Collectors.groupingBy(
                        c -> c.getLivre().getCategorie().getLibelle()));

        List<CategorieAppreciee> categories = parCategorie.entrySet().stream()
                .map(e -> new CategorieAppreciee(
                        e.getKey(),
                        e.getValue().stream().mapToInt(Commentaire::getNote).average().orElse(0),
                        e.getValue().size()))
                .sorted(Comparator.comparingDouble(CategorieAppreciee::noteMoyenne)
                        .reversed().thenComparing(CategorieAppreciee::categorie))
                .toList();

        return new Indicateurs(livres, categories);
    }
}
