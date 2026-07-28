package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Exemplaire;
import fr.eni.bookhub.entity.StatutExemplaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExemplaireRepository
        extends JpaRepository<Exemplaire, Integer> {

    Optional<Exemplaire> findFirstByLivreIdLivreAndStatut(
            Integer idLivre,
            StatutExemplaire statut
    );

    List<Exemplaire> findByLivreIdLivre(Integer idLivre);

    long countByLivreIdLivreAndStatut(
            Integer idLivre,
            StatutExemplaire statut
    );
}
