package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.LivreRequestDTO;
import fr.eni.bookhub.dto.LivreResponseDTO;
import fr.eni.bookhub.entity.Categorie;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.repository.CategorieRepository;
import fr.eni.bookhub.repository.LivreRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    public LivreResponseDTO ajouterLivre(LivreRequestDTO dto, MultipartFile file) {
        String isbn = dto.getIsbn().trim();

        if (livreRepository.existsByIsbn(isbn)) {
            throw new RuntimeException("Ce livre existe déjà. Vous pouvez ajouter un nouvel exemplaire.");
        }

        Categorie categorie = categorieRepository
                .findById(dto.getIdCategorie())
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable avec l'identifiant : " + dto.getIdCategorie()));

        Livre livre = new Livre();
        livre.setIsbn(isbn);
        livre.setTitre(dto.getTitre().trim());
        livre.setDescription(dto.getDescription().trim());
        livre.setEdition(dto.getEdition().trim());
        livre.setAuteur(dto.getAuteur().trim());
        livre.setCategorie(categorie);

        // Handle file upload
        if (file != null && !file.isEmpty()) {
            try {
                // Generate a unique filename to avoid collisions
                String originalFilename = file.getOriginalFilename();
                String extension = originalFilename != null && originalFilename.contains(".")
                        ? originalFilename.substring(originalFilename.lastIndexOf("."))
                        : ".jpg";
                String uniqueFilename = UUID.randomUUID().toString() + extension;

                // Define the path
                String uploadDir = "src/main/resources/public/couvertures/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(uniqueFilename);
                Files.write(filePath, file.getBytes());

                // Save the public URL path to the database
                livre.setCouverture("/couvertures/" + uniqueFilename);

            } catch (Exception e) {
                throw new RuntimeException("Échec de l'enregistrement de l'image de couverture : " + e.getMessage());
            }
        } else {
            // Fallback to the URL provided in the DTO if no file is uploaded
            livre.setCouverture(dto.getCouverture());
        }

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
    public LivreResponseDTO getBook(Integer id) {

        Livre livre = livreRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Livre introuvable avec l'identifiant : " + id
                        )
                );

        return convertToDto(livre);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LivreResponseDTO> getBooks(String searchTerm) {
        // 1. If empty, return everything
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return livreRepository.findAll().stream()
                    .map(this::convertToDto)
                    .toList();
        }

        String cleanTerm = searchTerm.trim();
        Integer searchId = -1; // Default dummy ID

        // 2. Safely try to parse the search term into an Integer for the ID search
        try {
            searchId = Integer.parseInt(cleanTerm);
        } catch (NumberFormatException e) {
            // The user typed letters (e.g., "Harry Potter"), so it's not a valid ID.
            // searchId remains -1, which safely won't match any real book IDs.
        }

        // 3. Execute the safe search
        List<Livre> books = livreRepository.searchBooks(cleanTerm, searchId);

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
    public Optional<Livre> rechercherParIsbn(String isbn) {
        return livreRepository.findByIsbn(isbn);
    }

    @Override
    public void supprimerLivre(Integer id) {

        Livre livre = livreRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Livre introuvable avec l'identifiant : " + id
                        )
                );

        livreRepository.delete(livre);
    }

    @Override
    public LivreResponseDTO modifierLivre(Integer id, LivreRequestDTO dto) {

        Livre livre = livreRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Livre introuvable avec l'identifiant : " + id
                        )
                );

        String isbn = dto.getIsbn().trim();

        Optional<Livre> livreAvecMemeIsbn =
                livreRepository.findByIsbn(isbn);

        if (livreAvecMemeIsbn.isPresent()
                && !livreAvecMemeIsbn.get().getIdLivre().equals(id)) {

            throw new RuntimeException(
                    "Un autre livre existe déjà avec cet ISBN."
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

        livre.setIsbn(isbn);
        livre.setTitre(dto.getTitre().trim());
        livre.setDescription(dto.getDescription().trim());
        livre.setCouverture(dto.getCouverture());
        livre.setEdition(dto.getEdition().trim());
        livre.setAuteur(dto.getAuteur().trim());
        livre.setCategorie(categorie);

        Livre livreModifie = livreRepository.save(livre);

        return convertToDto(livreModifie);
    }
}