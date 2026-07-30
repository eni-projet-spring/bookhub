package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.CommentaireRequest;
import fr.eni.bookhub.dto.CommentaireResponse;
import fr.eni.bookhub.service.CommentaireService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {

    private final CommentaireService commentaireService;

    public CommentaireController(CommentaireService commentaireService) {
        this.commentaireService = commentaireService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentaireResponse ajouterCommentaire(
            Authentication authentication,
            @Valid @RequestBody CommentaireRequest dto
    ) {
        return commentaireService.ajouterCommentaireParEmail(
                authentication.getName(),
                dto
        );
    }

    @GetMapping("/moi")
    public List<CommentaireResponse> mesCommentaires(
            Authentication authentication
    ) {
        return commentaireService
                .listerCommentairesUtilisateurParEmail(
                        authentication.getName()
                );
    }

    @GetMapping("/livre/{idLivre}")
    public List<CommentaireResponse> commentairesLivre(
            @PathVariable Integer idLivre
    ) {
        return commentaireService
                .listerCommentairesLivre(idLivre);
    }

    @PutMapping("/{idCommentaire}")
    public CommentaireResponse modifierCommentaire(
            @PathVariable Integer idCommentaire,
            Authentication authentication,
            @Valid @RequestBody CommentaireRequest dto
    ) {
        return commentaireService
                .modifierCommentaireParEmail(
                        idCommentaire,
                        authentication.getName(),
                        dto
                );
    }

    @DeleteMapping("/{idCommentaire}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void supprimerCommentaire(
            @PathVariable Integer idCommentaire,
            Authentication authentication
    ) {
        commentaireService.supprimerCommentaireParEmail(
                idCommentaire,
                authentication.getName()
        );
    }
}