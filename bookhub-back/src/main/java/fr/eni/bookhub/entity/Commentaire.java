package fr.eni.bookhub.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "Commentaire",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "Commentaire_Utilisateur_Livre_UN",
                        columnNames = {
                                "Utilisateur_id_utilisateur",
                                "Livre_id_livre"
                        }
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commentaire")
    private Integer idCommentaire;

    @NotBlank
    @Size(max = 1000)
    @Column(name = "texte", nullable = false, length = 1000)
    private String texte;

    @Min(1)
    @Max(5)
    @Column(name = "note", nullable = false)
    private Integer note;

    @Column(name = "datePublication", nullable = false)
    private LocalDateTime datePublication;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "Utilisateur_id_utilisateur",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "Commentaire_Utilisateur_FK"
            )
    )
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "Livre_id_livre",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "Commentaire_Livre_FK"
            )
    )
    private Livre livre;

    @PrePersist
    public void avantCreation() {
        if (datePublication == null) {
            datePublication = LocalDateTime.now();
        }
    }
}