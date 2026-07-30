package fr.eni.bookhub.repository;

import fr.eni.bookhub.entity.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentaireRepository
        extends JpaRepository<Commentaire, Integer> {

    List<Commentaire>
    findByUtilisateurEmailOrderByDatePublicationDesc(
            String email
    );

    List<Commentaire>
    findByLivreIdLivreOrderByDatePublicationDesc(
            Integer idLivre
    );

    boolean existsByUtilisateurIdUtilisateurAndLivreIdLivre(
            Integer idUtilisateur,
            Integer idLivre
    );
}