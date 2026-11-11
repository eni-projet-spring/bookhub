package fr.eni.bookhub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/** Avis associé à un lecteur et à un livre : aucun nom d'auteur d'avis n'est fourni par le client. */
@Entity
@Table(name = "Commentaire", schema = "dbo",
        uniqueConstraints = @UniqueConstraint(name = "Commentaire_utilisateur_livre_UN",
                columnNames = {"Utilisateur_id_utilisateur", "Livre_id_livre"}))
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commentaire")
    private Integer idCommentaire;

    @Column(name = "texte", nullable = false, length = 1000)
    private String texte;

    @Column(name = "datePublication", nullable = false)
    private LocalDateTime datePublication;

    @Column(name = "note", nullable = false)
    private Integer note;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Utilisateur_id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Livre_id_livre", nullable = false)
    private Livre livre;

    public Integer getIdCommentaire() { return idCommentaire; }
    public String getTexte() { return texte; }
    public void setTexte(String texte) { this.texte = texte; }
    public LocalDateTime getDatePublication() { return datePublication; }
    public void setDatePublication(LocalDateTime datePublication) { this.datePublication = datePublication; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    public Livre getLivre() { return livre; }
    public void setLivre(Livre livre) { this.livre = livre; }
}
