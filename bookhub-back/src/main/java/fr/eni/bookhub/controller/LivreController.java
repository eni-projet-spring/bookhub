package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.LivreRequestDTO;
import fr.eni.bookhub.dto.LivreResponseDTO;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.service.LivreService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/livres")
public class LivreController {

    private final LivreService livreService;

    public LivreController(LivreService livreService) {
        this.livreService = livreService;
    }

    /**
     * Ajouter un livre
     */
    @PostMapping
    public ResponseEntity<LivreResponseDTO> ajouterLivre(
            @Valid @RequestBody LivreRequestDTO dto) {

        LivreResponseDTO livreAjoute = livreService.ajouterLivre(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(livreAjoute);
    }

    /**
     * Consulter tous les livres
     */
    @GetMapping
    public ResponseEntity<List<Livre>> consulterTousLesLivres() {
        return ResponseEntity.ok(livreService.consulterTousLesLivres());
    }

    /**
     * Consulter un livre par son identifiant
     */
    @GetMapping("/{id}")
    public ResponseEntity<Livre> consulterLivreParId(
            @PathVariable Integer id) {

        return ResponseEntity.ok(livreService.consulterLivreParId(id));
    }

    /**
     * Rechercher un livre par ISBN
     */
    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<Livre> rechercherParIsbn(
            @PathVariable String isbn) {

        Optional<Livre> livre = livreService.rechercherParIsbn(isbn);

        return livre
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Modifier un livre
     */
    @PutMapping("/{id}")
    public ResponseEntity<LivreResponseDTO> modifierLivre(
            @PathVariable Integer id,
            @Valid @RequestBody LivreRequestDTO dto) {

        LivreResponseDTO livreModifie = livreService.modifierLivre(id, dto);
        return ResponseEntity.ok(livreModifie);
    }

    /**
     * Supprimer un livre
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerLivre(
            @PathVariable Integer id) {

        livreService.supprimerLivre(id);
        return ResponseEntity.noContent().build();
    }
}