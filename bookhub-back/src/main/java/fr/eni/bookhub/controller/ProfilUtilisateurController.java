package fr.eni.bookhub.controller;

import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.service.ProfilUtilisateurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profil")
public class ProfilUtilisateurController {

    private final ProfilUtilisateurService profilUtilisateurService;

    public ProfilUtilisateurController(ProfilUtilisateurService profilUtilisateurService) {
        this.profilUtilisateurService = profilUtilisateurService;
    }

    @GetMapping("/{idUtilisateur}")
    public ResponseEntity<Utilisateur> getProfilUtilisateur(@PathVariable (name = "idUtilisateur") Integer idUtilisateur) {
        Utilisateur utilisateur = profilUtilisateurService.getProfilUtilisateurById(idUtilisateur);
        return ResponseEntity.ok(utilisateur);
    }

}
