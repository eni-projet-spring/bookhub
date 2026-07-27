package fr.eni.bookhub.service;

import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.repository.CategorieRepository;
import fr.eni.bookhub.repository.LivreRepository;
import org.springframework.stereotype.Service;
import fr.eni.bookhub.dto.LivreRequestDTO;
import fr.eni.bookhub.dto.LivreResponseDTO;
import fr.eni.bookhub.entity.Categorie;
import java.util.List;
import java.util.Optional;

@Service
public class LivreServiceImpl implements LivreService {

    private final LivreRepository livreRepository;
    private final CategorieRepository categorieRepository;

    public LivreServiceImpl(
            LivreRepository livreRepository,
            CategorieRepository categorieRepository
    ) {
        this.livreRepository = livreRepository;
        this.categorieRepository = categorieRepository;
    }

    @Override
    public LivreResponseDTO ajouterLivre(LivreRequestDTO dto) {

        String isbn = dto.getIsbn().trim();

        if (livreRepository.existsByIsbn(isbn)) {
            throw new RuntimeException(
                    "Ce livre existe déjà. Vous pouvez ajouter un nouvel exemplaire."
            );
        }

        Categorie categorie = categorieRepository
                .findById(dto.getIdCategorie())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Catégorie introuvable avec l'identifiant : "
                                        + dto.getIdCategorie()
                        )
                );

        Livre livre = new Livre();

        livre.setIsbn(isbn);
        livre.setTitre(dto.getTitre().trim());
        livre.setDescription(dto.getDescription().trim());
        livre.setCouverture(dto.getCouverture());
        livre.setEdition(dto.getEdition().trim());
        livre.setAuteur(dto.getAuteur().trim());
        livre.setCategorie(categorie);

        Livre livreEnregistre = livreRepository.save(livre);

        LivreResponseDTO response = new LivreResponseDTO();

        response.setIdLivre(livreEnregistre.getIdLivre());
        response.setIsbn(livreEnregistre.getIsbn());
        response.setTitre(livreEnregistre.getTitre());
        response.setDescription(livreEnregistre.getDescription());
        response.setCouverture(livreEnregistre.getCouverture());
        response.setEdition(livreEnregistre.getEdition());
        response.setAuteur(livreEnregistre.getAuteur());
        response.setIdCategorie(categorie.getIdCategorie());
        response.setLibelleCategorie(categorie.getLibelle());

        return response;
    }

    @Override
    public List<LivreResponseDTO> getAllBooks() {
        List<Livre> books =  livreRepository.findAll();
        return books.stream()
                .map(this::convertToDto)
                .toList();
    }

    private LivreResponseDTO convertToDto(Livre book) {
        LivreResponseDTO dto = new LivreResponseDTO();

        dto.setIdLivre(book.getIdLivre());
        dto.setIsbn(book.getIsbn());
        dto.setTitre(book.getTitre());
        dto.setDescription(book.getDescription());
        dto.setCouverture(book.getCouverture());
        dto.setEdition(book.getEdition());
        dto.setAuteur(book.getAuteur());

        if (book.getCategorie() != null) {
            dto.setIdCategorie(book.getCategorie().getIdCategorie());
            dto.setLibelleCategorie(book.getCategorie().getLibelle());
        }

        return dto;
    }

    @Override
    public Livre consulterLivreParId(Integer id) {
        return livreRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Livre introuvable avec l'identifiant : " + id)
                );
    }

    @Override
    public Optional<Livre> rechercherParIsbn(String isbn) {
        return livreRepository.findByIsbn(isbn);
    }
}