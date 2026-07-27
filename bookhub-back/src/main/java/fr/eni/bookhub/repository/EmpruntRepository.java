package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {

    long countByDateRetourReelleIsNull();

    long countByDateRetourReelleIsNullAndDateRetourPrevueBefore(
            LocalDate date
    );

    List<Emprunt> findByDateRetourReelleIsNullAndDateRetourPrevueBeforeOrderByDateRetourPrevueAsc(
            LocalDate date
    );

    @Query("""
            SELECT e.livre.idLivre,
                   e.livre.titre,
                   e.livre.auteur,
                   COUNT(e)
            FROM Emprunt e
            GROUP BY e.livre.idLivre,
                     e.livre.titre,
                     e.livre.auteur
            ORDER BY COUNT(e) DESC
            """)
    List<Object[]> rechercherLivresLesPlusEmpruntes();
}