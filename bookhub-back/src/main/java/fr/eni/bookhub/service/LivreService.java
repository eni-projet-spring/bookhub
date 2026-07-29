package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.LivreRequestDTO;
import fr.eni.bookhub.dto.LivreResponseDTO;
import fr.eni.bookhub.entity.Livre;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface LivreService {

    LivreResponseDTO ajouterLivre(LivreRequestDTO dto);

    LivreResponseDTO getBook(Integer id);

    LivreResponseDTO modifierLivre(Integer id, LivreRequestDTO dto);

    List<LivreResponseDTO> getBooks(String searchTerm);

    Optional<Livre> rechercherParIsbn(String isbn);

    void supprimerLivre(Integer id);
}