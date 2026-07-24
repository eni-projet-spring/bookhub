package fr.eni.bookhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProfilUtilisateurDTO {
    @NotBlank
    private String nom;
    @Size(min = 1, max = 50)
    private String prenom;
    @Email
    private String email;

}
