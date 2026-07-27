package fr.eni.bookhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "Livre",
        schema = "dbo",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "Livre_isbn_UN",
                        columnNames = "isbn"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_livre")
    private Integer idLivre;

    @Column(name = "isbn", nullable = false, unique = true, length = 13)
    private String isbn;

    @Column(name = "titre", nullable = false, length = 100)
    private String titre;

    @Column(name = "description", nullable = false, length = 400)
    private String description;

    @Column(name = "couverture", length = 255)
    private String couverture;

    @Column(name = "edition", nullable = false, length = 100)
    private String edition;

    @Column(name = "auteur", nullable = false, length = 100)
    private String auteur;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "Categorie_id_categorie",
            nullable = false,
            foreignKey = @ForeignKey(name = "Livre_Categorie_FK")
    )
    private Categorie categorie;

    @OneToMany(
            mappedBy = "livre",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Reservation> reservations = new ArrayList<>();
}