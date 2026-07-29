package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LivreRepository extends JpaRepository<Livre, Integer> {

    Optional<Livre> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    @Query("SELECT l FROM Livre l WHERE " +
            "LOWER(l.titre) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(l.auteur) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(l.isbn) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "l.idLivre = :id")
    List<Livre> searchBooks(@Param("term") String term, @Param("id") Integer id);
}