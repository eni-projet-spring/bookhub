package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.EmpruntResponse;
import fr.eni.bookhub.service.EmpruntService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    @GetMapping("/retards")
    public ResponseEntity<List<EmpruntResponse>>
    consulterEmpruntsEnRetard() {

        return ResponseEntity.ok(
                empruntService.consulterEmpruntsEnRetard()
        );
    }
}