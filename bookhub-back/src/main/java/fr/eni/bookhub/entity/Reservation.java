package fr.eni.bookhub.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "Reservation",
        schema = "dbo"
)
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reservation")
    private Integer idReservation;

    @Column(name = "date_demande", nullable = false)
    private LocalDateTime dateDemande;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false, length = 20)
    private StatutReservation statut;

    @Column(name = "disponibilite", nullable = false)
    private Boolean disponibilite;

    @Column(name = "position_file_attente", nullable = false)
    private Integer positionFileAttente;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "id_utilisateur",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "Reservation_Utilisateur_FK"
            )
    )
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "id_livre",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "Reservation_Livre_FK"
            )
    )
    private Livre livre;

    public Reservation() {
    }

    public Reservation(
            LocalDateTime dateDemande,
            StatutReservation statut,
            Boolean disponibilite,
            Integer positionFileAttente,
            Utilisateur utilisateur,
            Livre livre
    ) {
        this.dateDemande = dateDemande;
        this.statut = statut;
        this.disponibilite = disponibilite;
        this.positionFileAttente = positionFileAttente;
        this.utilisateur = utilisateur;
        this.livre = livre;
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

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }
}