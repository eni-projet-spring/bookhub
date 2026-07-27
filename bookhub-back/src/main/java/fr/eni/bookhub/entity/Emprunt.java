package fr.eni.bookhub.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "EMPRUNT")
public class Emprunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_emprunt")
    private Long idEmprunt;

    @Column(name = "date_emprunt", nullable = false)
    private LocalDate dateEmprunt;

    @Column(name = "date_retour_prevue", nullable = false)
    private LocalDate dateRetourPrevue;

    @Column(name = "date_retour_reelle")
    private LocalDate dateRetourReelle;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_exemplaire", nullable = false)
    private Exemplaire exemplaire;

    public Emprunt() {
    }

    public Emprunt(
            LocalDate dateEmprunt,
            LocalDate dateRetourPrevue,
            Utilisateur utilisateur,
            Exemplaire exemplaire
    ) {
        this.dateEmprunt = dateEmprunt;
        this.dateRetourPrevue = dateRetourPrevue;
        this.utilisateur = utilisateur;
        this.exemplaire = exemplaire;
    }

    public Long getIdEmprunt() {
        return idEmprunt;
    }

    public void setIdEmprunt(Long idEmprunt) {
        this.idEmprunt = idEmprunt;
    }

    public LocalDate getDateEmprunt() {
        return dateEmprunt;
    }

    public void setDateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
    }

    public LocalDate getDateRetourPrevue() {
        return dateRetourPrevue;
    }

    public void setDateRetourPrevue(LocalDate dateRetourPrevue) {
        this.dateRetourPrevue = dateRetourPrevue;
    }

    public LocalDate getDateRetourReelle() {
        return dateRetourReelle;
    }

    public void setDateRetourReelle(LocalDate dateRetourReelle) {
        this.dateRetourReelle = dateRetourReelle;
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

    @Transient
    public boolean estEnCours() {
        return dateRetourReelle == null;
    }

    @Transient
    public boolean estEnRetard() {
        return dateRetourReelle == null
                && dateRetourPrevue != null
                && dateRetourPrevue.isBefore(LocalDate.now());
    }
}