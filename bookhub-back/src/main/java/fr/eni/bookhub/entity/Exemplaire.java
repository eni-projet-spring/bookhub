package fr.eni.bookhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "EXEMPLAIRE")
public class Exemplaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exemplaire")
    private Long idExemplaire;

    @Column(name = "code_exemplaire", nullable = false, unique = true)
    private String codeExemplaire;

    @Column(name = "disponible", nullable = false)
    private Boolean disponible = true;

    @Column(name = "etat")
    private String etat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_livre", nullable = false)
    private Livre livre;

    public Exemplaire() {
    }

    public Exemplaire(
            String codeExemplaire,
            Boolean disponible,
            String etat,
            Livre livre
    ) {
        this.codeExemplaire = codeExemplaire;
        this.disponible = disponible;
        this.etat = etat;
        this.livre = livre;
    }

    public Long getIdExemplaire() {
        return idExemplaire;
    }

    public void setIdExemplaire(Long idExemplaire) {
        this.idExemplaire = idExemplaire;
    }

    public String getCodeExemplaire() {
        return codeExemplaire;
    }

    public void setCodeExemplaire(String codeExemplaire) {
        this.codeExemplaire = codeExemplaire;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }
}