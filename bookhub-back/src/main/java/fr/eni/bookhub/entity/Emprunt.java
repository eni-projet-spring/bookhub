package fr.eni.bookhub.entity;

import fr.eni.bookhub.converter.StatutEmpruntConverter;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Emprunt")
public class Emprunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_emprunt")
    private Integer idEmprunt;

    @Column(name = "dateDebut", nullable = false)
    private LocalDateTime dateDebut;

    @Column(name = "dateFinPrevue", nullable = false)
    private LocalDateTime dateFinPrevue;

    @Column(name = "dateRetour")
    private LocalDateTime dateRetour;

    @Convert(converter = StatutEmpruntConverter.class)
    @Column(name = "statut", nullable = false, length = 10)
    private StatutEmprunt statut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Utilisateur_id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Exemplaire_id_exemplaire", nullable = false)
    private Exemplaire exemplaire;

    public Emprunt() {
    }

    public Emprunt(
            LocalDateTime dateDebut,
            LocalDateTime dateFinPrevue,
            StatutEmprunt statut,
            Utilisateur utilisateur,
            Exemplaire exemplaire
    ) {
        this.dateDebut = dateDebut;
        this.dateFinPrevue = dateFinPrevue;
        this.statut = statut;
        this.utilisateur = utilisateur;
        this.exemplaire = exemplaire;
    }

    @PrePersist
    public void avantCreation() {
        if (dateDebut == null) {
            dateDebut = LocalDateTime.now();
        }

        if (dateFinPrevue == null) {
            dateFinPrevue = dateDebut.plusDays(21);
        }

        if (statut == null) {
            statut = StatutEmprunt.EN_COURS;
        }
    }

    public Integer getIdEmprunt() {
        return idEmprunt;
    }

    public void setIdEmprunt(Integer idEmprunt) {
        this.idEmprunt = idEmprunt;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDateTime getDateFinPrevue() {
        return dateFinPrevue;
    }

    public void setDateFinPrevue(LocalDateTime dateFinPrevue) {
        this.dateFinPrevue = dateFinPrevue;
    }

    public LocalDateTime getDateRetour() {
        return dateRetour;
    }

    public void setDateRetour(LocalDateTime dateRetour) {
        this.dateRetour = dateRetour;
    }

    public StatutEmprunt getStatut() {
        return statut;
    }

    public void setStatut(StatutEmprunt statut) {
        this.statut = statut;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Exemplaire getExemplaire() {
        return exemplaire;
    }

    public void setExemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
    }
}