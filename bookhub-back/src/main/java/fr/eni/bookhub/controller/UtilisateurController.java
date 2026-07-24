package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.ConnexionRequest;
import fr.eni.bookhub.dto.UtilisateurResponse;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.service.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping("/login")
    public ResponseEntity<UtilisateurResponse> login(
            @Valid @RequestBody ConnexionRequest connexionRequest
    ) {
        Utilisateur utilisateur = utilisateurService.connecter(
                connexionRequest.getEmail(),
                connexionRequest.getMotDePasse()
        );

        UtilisateurResponse response = new UtilisateurResponse(
                utilisateur.getIdUtilisateur(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole()
        );

        return ResponseEntity.ok(response);
    }
}