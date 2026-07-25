package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.ConnexionRequest;
import fr.eni.bookhub.dto.ConnexionResponse;
import fr.eni.bookhub.dto.InscriptionUtilisateurDto;
import fr.eni.bookhub.dto.UtilisateurResponse;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.service.JwtService;
import fr.eni.bookhub.service.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    private final JwtService jwtService;

    public UtilisateurController(
            UtilisateurService utilisateurService,
            JwtService jwtService
    ) {
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<ConnexionResponse> connecter(
            @Valid @RequestBody ConnexionRequest connexionRequest
    ) {
        Utilisateur utilisateur = utilisateurService.connecter(
                connexionRequest.getEmail(),
                connexionRequest.getMotDePasse()
        );

        String token = jwtService.genererToken(utilisateur);

        ConnexionResponse response = new ConnexionResponse(
                token,
                utilisateur.getIdUtilisateur(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/inscription")
    public ResponseEntity<UtilisateurResponse> inscrire(
            @Valid @RequestBody InscriptionUtilisateurDto inscriptionDto
    ) {
        Utilisateur utilisateur =
                utilisateurService.inscrire(inscriptionDto);

        UtilisateurResponse response = new UtilisateurResponse(
                utilisateur.getIdUtilisateur(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}