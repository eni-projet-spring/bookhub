package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfilUtilisateurDTO {
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse; // optionnel, uniquement pour changer le mot de passe

    public static ProfilUtilisateurDTO fromEntity(Utilisateur utilisateur) {
        return new ProfilUtilisateurDTO(utilisateur.getNom(), utilisateur.getPrenom(), utilisateur.getEmail(), null);
        // motDePasse toujours null en lecture, on ne renvoie jamais le mot de passe au client
    }
}
