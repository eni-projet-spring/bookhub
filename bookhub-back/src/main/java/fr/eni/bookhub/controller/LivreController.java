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

@RestController
@RequestMapping("/api/livres")
public class LivreController {

    private final LivreService livreService;

    public LivreController(LivreService livreService) {
        this.livreService = livreService;
    }

    @PostMapping
    public ResponseEntity<LivreResponseDTO> ajouterLivre(
            @Valid @RequestBody LivreRequestDTO dto
    ) {
        LivreResponseDTO livreAjoute = livreService.ajouterLivre(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(livreAjoute);
    }

    @GetMapping
    public ResponseEntity<List<Livre>> consulterTousLesLivres() {
        return ResponseEntity.ok(
                livreService.consulterTousLesLivres()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livre> consulterLivreParId(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(
                livreService.consulterLivreParId(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerLivre(
            @PathVariable Integer id
    ) {
        livreService.supprimerLivre(id);

        return ResponseEntity.noContent().build();
    }
}