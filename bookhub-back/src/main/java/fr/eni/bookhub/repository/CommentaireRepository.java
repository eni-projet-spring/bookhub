package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/** Les requêtes sont restreintes à l'identité extraite du JWT par le contrôleur. */
public interface CommentaireRepository extends JpaRepository<Commentaire, Integer> {
    List<Commentaire> findByUtilisateurEmailOrderByDatePublicationDesc(String email);
    Optional<Commentaire> findByUtilisateurEmailAndLivreIsbn(String email, String isbn);
}
