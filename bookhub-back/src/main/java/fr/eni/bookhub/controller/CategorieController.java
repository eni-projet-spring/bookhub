package fr.eni.bookhub.controller;

import fr.eni.bookhub.repository.CategorieRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

/** Liste des catégories réellement enregistrées en base. */
@RestController
@RequestMapping("/api/categories")
public class CategorieController {
    private final CategorieRepository categorieRepository;

    public CategorieController(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    public record CategorieResponse(Integer idCategorie, String libelle) {}

    @GetMapping
    public List<CategorieResponse> listerCategories() {
        return categorieRepository.findAll().stream()
                .map(c -> new CategorieResponse(c.getIdCategorie(), c.getLibelle()))
                .sorted(Comparator.comparing(CategorieResponse::libelle))
                .toList();
    }
}
