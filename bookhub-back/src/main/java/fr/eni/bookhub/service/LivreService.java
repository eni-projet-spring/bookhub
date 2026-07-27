package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.LivreRequestDTO;
import fr.eni.bookhub.dto.LivreResponseDTO;
import fr.eni.bookhub.entity.Livre;

import java.util.List;
import java.util.Optional;

public interface LivreService {

    LivreResponseDTO ajouterLivre(LivreRequestDTO dto);

    List<LivreResponseDTO> getAllBooks();

    Livre consulterLivreParId(Integer id);

    Optional<Livre> rechercherParIsbn(String isbn);

    void supprimerLivre(Integer id);

}