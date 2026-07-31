package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.service.EmpruntService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprunts")
public class EmpruntController {

    private final EmpruntService empruntService;

    public EmpruntController(
            EmpruntService empruntService
    ) {
        this.empruntService = empruntService;
    }

    @GetMapping("/utilisateur/{idUtilisateur}")
    public List<EmpruntResponse> rechercherEmpruntsUtilisateur(
            @PathVariable Integer idUtilisateur
    ) {
        return empruntService.rechercherEmpruntsParUtilisateur(
                idUtilisateur
        );
    }

    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    @GetMapping("/retards")
    public ResponseEntity<List<EmpruntResponse>>
    consulterEmpruntsEnRetard() {

        return ResponseEntity.ok(
                empruntService.consulterEmpruntsEnRetard()
        );
    }

    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    @PatchMapping("/{idEmprunt}/retour")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enregistrerRetour(
            @PathVariable Integer idEmprunt
    ) {
        empruntService.enregistrerRetour(idEmprunt);
    }
}