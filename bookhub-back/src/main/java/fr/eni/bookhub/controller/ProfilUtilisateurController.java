package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.ProfilUtilisateurDTO;
import fr.eni.bookhub.service.ProfilUtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profil")
public class ProfilUtilisateurController {

    private final ProfilUtilisateurService profilUtilisateurService;

    public ProfilUtilisateurController(ProfilUtilisateurService profilUtilisateurService) {
        this.profilUtilisateurService = profilUtilisateurService;
    }

    @GetMapping
    public ResponseEntity<ProfilUtilisateurDTO> getProfil(Authentication authentication) {
        String email = "test@bookhub.fr"; // temporaire, en attendant le vrai login
        return ResponseEntity.ok(profilUtilisateurService.getProfilByEmail(email));
    }

    @PutMapping
    public ResponseEntity<ProfilUtilisateurDTO> editProfil(
            Authentication authentication, @RequestBody @Valid ProfilUtilisateurDTO dto) {
        return ResponseEntity.ok(profilUtilisateurService.editProfil("test@bookhub.fr", dto));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteProfil(Authentication authentication) {
        profilUtilisateurService.deleteProfil("test@bookhub.fr");
        return ResponseEntity.noContent().build();
    }
}