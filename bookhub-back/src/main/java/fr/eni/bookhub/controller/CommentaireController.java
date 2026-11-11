package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.CommentaireRequest;
import fr.eni.bookhub.dto.CommentaireResponse;
import fr.eni.bookhub.entity.Commentaire;
import fr.eni.bookhub.entity.Emprunt;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.repository.CommentaireRepository;
import fr.eni.bookhub.repository.EmpruntRepository;
import fr.eni.bookhub.repository.LivreRepository;
import fr.eni.bookhub.repository.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

/** Gestion des avis du lecteur connecté, sans identifiant utilisateur fourni par le client. */
@RestController
@RequestMapping("/api/commentaires")
@PreAuthorize("hasRole('USER')")
public class CommentaireController {
    private final CommentaireRepository commentaires;
    private final EmpruntRepository emprunts;
    private final LivreRepository livres;
    private final UtilisateurRepository utilisateurs;

    public CommentaireController(CommentaireRepository commentaires, EmpruntRepository emprunts,
                                 LivreRepository livres, UtilisateurRepository utilisateurs) {
        this.commentaires = commentaires;
        this.emprunts = emprunts;
        this.livres = livres;
        this.utilisateurs = utilisateurs;
    }

    @GetMapping("/mes-commentaires")
    @Transactional(readOnly = true)
    public List<CommentaireResponse> mesCommentaires(Authentication authentification) {
        return commentaires.findByUtilisateurEmailOrderByDatePublicationDesc(authentification.getName())
                .stream().map(this::versResponse).toList();
    }

    @PutMapping("/livre/{isbn}")
    @Transactional
    public CommentaireResponse enregistrer(@PathVariable String isbn,
                                           @Valid @RequestBody CommentaireRequest demande,
                                           Authentication authentification) {
        String email = authentification.getName();
        Livre livre = livres.findByIsbn(isbn).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Livre introuvable"));

        // Un avis est autorisé seulement sur un livre effectivement emprunté et retourné.
        boolean aLu = emprunts.findByUtilisateurEmailOrderByDateDebutDesc(email).stream()
                .anyMatch((Emprunt emprunt) -> emprunt.getDateRetour() != null
                        && emprunt.getExemplaire().getLivre().getIdLivre().equals(livre.getIdLivre()));
        if (!aLu) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Vous devez avoir retourné ce livre pour déposer un avis");
        }

        Utilisateur utilisateur = utilisateurs.findByEmail(email).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Compte introuvable"));

        // Un seul avis par lecteur et par livre ; PUT crée ou modifie cet avis.
        Commentaire commentaire = commentaires.findByUtilisateurEmailAndLivreIsbn(email, isbn)
                .orElseGet(Commentaire::new);
        commentaire.setUtilisateur(utilisateur);
        commentaire.setLivre(livre);
        commentaire.setTexte(demande.texte().trim());
        commentaire.setNote(demande.note());
        commentaire.setDatePublication(LocalDateTime.now());
        return versResponse(commentaires.save(commentaire));
    }

    private CommentaireResponse versResponse(Commentaire commentaire) {
        Livre livre = commentaire.getLivre();
        return new CommentaireResponse(commentaire.getIdCommentaire(), livre.getIdLivre(),
                livre.getIsbn(), livre.getTitre(), livre.getAuteur(), commentaire.getNote(),
                commentaire.getTexte(), commentaire.getDatePublication());
    }
}
