package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.StatutReservation;

import java.time.LocalDateTime;

public class ReservationResponse {

    private Integer idReservation;
    private LocalDateTime dateDemande;
    private StatutReservation statut;
    private Boolean disponibilite;
    private Integer positionFileAttente;
    private Integer idUtilisateur;
    private Integer idLivre;
    private String titreLivre;
    private String isbn;

    public ReservationResponse() {
    }

    public ReservationResponse(
            Integer idReservation,
            LocalDateTime dateDemande,
            StatutReservation statut,
            Boolean disponibilite,
            Integer positionFileAttente,
            Integer idUtilisateur,
            Integer idLivre,
            String titreLivre,
            String isbn
    ) {
        this.idReservation = idReservation;
        this.dateDemande = dateDemande;
        this.statut = statut;
        this.disponibilite = disponibilite;
        this.positionFileAttente = positionFileAttente;
        this.idUtilisateur = idUtilisateur;
        this.idLivre = idLivre;
        this.titreLivre = titreLivre;
        this.isbn = isbn;
    }

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public LocalDateTime getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(LocalDateTime dateDemande) {
        this.dateDemande = dateDemande;
    }

    public StatutReservation getStatut() {
        return statut;
    }

    public void setStatut(StatutReservation statut) {
        this.statut = statut;
    }

    public Boolean getDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    public Integer getPositionFileAttente() {
        return positionFileAttente;
    }

    public void setPositionFileAttente(Integer positionFileAttente) {
        this.positionFileAttente = positionFileAttente;
    }

    public Integer getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Integer idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public Integer getIdLivre() {
        return idLivre;
    }

    public void setIdLivre(Integer idLivre) {
        this.idLivre = idLivre;
    }
    public String getTitreLivre() {
        return titreLivre;
    }

    public void setTitreLivre(String titreLivre) {
        this.titreLivre = titreLivre;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}