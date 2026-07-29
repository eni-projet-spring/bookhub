package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface EmpruntRepository
        extends JpaRepository<Emprunt, Integer> {

    long countByDateRetourIsNull();

    long countByDateRetourIsNullAndDateFinPrevueBefore(
            LocalDateTime date
    );

    List<Emprunt>
    findByDateRetourIsNullAndDateFinPrevueBeforeOrderByDateFinPrevueAsc(
            LocalDateTime date
    );

    /**
     * Récupère tous les emprunts d'un lecteur,
     * du plus récent au plus ancien.
     */
    List<Emprunt> findByUtilisateurIdUtilisateurOrderByDateDebutDesc(
            Integer idUtilisateur
    );

    @Query("""
            SELECT
                l.idLivre,
                l.titre,
                l.auteur,
                COUNT(e.idEmprunt)
            FROM Emprunt e
            JOIN e.exemplaire ex
            JOIN ex.livre l
            GROUP BY
                l.idLivre,
                l.titre,
                l.auteur
            ORDER BY COUNT(e.idEmprunt) DESC
            """)

    List<Object[]> rechercherLivresLesPlusEmpruntes();
    List<Emprunt> findByUtilisateurEmailOrderByDateDebutDesc(
            String email
    );
}