package fr.eni.bookhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Exemplaire")
public class Exemplaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exemplaire")
    private Integer idExemplaire;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", length = 10)
    private StatutExemplaire statut;

    @Enumerated(EnumType.STRING)
    @Column(name = "etatPhysique", length = 15)
    private EtatPhysique etatPhysique;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Livre_id_livre")
    private Livre livre;

    public Exemplaire() {
    }

    public Exemplaire(
            StatutExemplaire statut,
            EtatPhysique etatPhysique,
            Livre livre
    ) {
        this.statut = statut;
        this.etatPhysique = etatPhysique;
        this.livre = livre;
    }

    @PrePersist
    public void avantCreation() {
        if (statut == null) {
            statut = StatutExemplaire.DISPONIBLE;
        }

        if (etatPhysique == null) {
            etatPhysique = EtatPhysique.NEUF;
        }
    }

    public Integer getIdExemplaire() {
        return idExemplaire;
    }

    public void setIdExemplaire(Integer idExemplaire) {
        this.idExemplaire = idExemplaire;
    }

    public StatutExemplaire getStatut() {
        return statut;
    }

    public void setStatut(StatutExemplaire statut) {
        this.statut = statut;
    }

    public EtatPhysique getEtatPhysique() {
        return etatPhysique;
    }

    public void setEtatPhysique(EtatPhysique etatPhysique) {
        this.etatPhysique = etatPhysique;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }
}