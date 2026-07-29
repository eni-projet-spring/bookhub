package fr.eni.bookhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class InscriptionUtilisateurDto {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(
            max = 25,
            message = "Le nom ne doit pas dépasser 25 caractères"
    )
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(
            max = 25,
            message = "Le prénom ne doit pas dépasser 25 caractères"
    )
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'adresse email n'est pas valide")
    @Size(
            max = 100,
            message = "L'adresse email ne doit pas dépasser 100 caractères"
    )
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(
            min = 4,
            max = 25,
            message = "Le mot de passe doit contenir entre 4 et 25 caractères"
    )
    private String motDePasse;

    @NotBlank(message = "La confirmation du mot de passe est obligatoire")
    @Size(
            min = 4,
            max = 25,
            message = "Le mot de passe doit contenir entre 4 et 25 caractères"
    )
    private String confirmationMotDePasse;

    /**Constructor*/
    public InscriptionUtilisateurDto() {
    }

    public InscriptionUtilisateurDto(String nom, String prenom, String email, String motDePasse, String confirmationMotDePasse) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.confirmationMotDePasse = confirmationMotDePasse;
    }

    /**Getters and setters*/
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getConfirmationMotDePasse() {
        return confirmationMotDePasse;
    }

    public void setConfirmationMotDePasse(String confirmationMotDePasse) {
        this.confirmationMotDePasse = confirmationMotDePasse;
    }

    /**ToString*/
    @Override
    public String toString() {
        return "InscriptionUtilisateurDto{" +
                "nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
