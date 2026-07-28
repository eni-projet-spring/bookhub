package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.LivreRequestDTO;
import fr.eni.bookhub.dto.LivreResponseDTO;
import fr.eni.bookhub.service.LivreService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<List<LivreResponseDTO>> getAllBooks() {
        return ResponseEntity.ok(
                livreService.getAllBooks()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivreResponseDTO> getBook(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(
                livreService.getBook(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivreResponseDTO> modifierLivre(
            @PathVariable Integer id,
            @Valid @RequestBody LivreRequestDTO dto
    ) {
        LivreResponseDTO livreModifie =
                livreService.modifierLivre(id, dto);

        return ResponseEntity.ok(livreModifie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerLivre(
            @PathVariable Integer id
    ) {
        livreService.supprimerLivre(id);

        return ResponseEntity.noContent().build();
    }
}