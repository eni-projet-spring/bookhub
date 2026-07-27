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
        return ResponseEntity.ok(profilUtilisateurService.getProfilByEmail(authentication.getName()));
    }

    @PutMapping
    public ResponseEntity<ProfilUtilisateurDTO> editProfil(
            Authentication authentication, @RequestBody @Valid ProfilUtilisateurDTO dto) {
        return ResponseEntity.ok(profilUtilisateurService.editProfil(authentication.getName(), dto));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteProfil(Authentication authentication) {
        profilUtilisateurService.deleteProfil(authentication.getName());
        return ResponseEntity.noContent().build();
    }
}