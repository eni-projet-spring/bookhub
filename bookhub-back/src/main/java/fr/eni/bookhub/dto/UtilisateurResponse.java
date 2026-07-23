package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.Role;

public class UtilisateurResponse {

    private Integer idUtilisateur;
    private String nom;
    private String prenom;
    private String email;
    private Role role;

    public UtilisateurResponse() {
    }

    public UtilisateurResponse(Integer idUtilisateur, String nom, String prenom,
                               String email, Role role) {
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.role = role;
    }

    public Integer getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Integer idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}