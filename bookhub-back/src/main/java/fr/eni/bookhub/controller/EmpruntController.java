package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.service.EmpruntService;
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
}