package fr.eni.bookhub.controller;

import fr.eni.bookhub.dto.StatistiquesBibliothequeResponse;
import fr.eni.bookhub.service.StatistiquesBibliothequeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bibliothecaire")
public class StatistiquesBibliothequeController {

    private final StatistiquesBibliothequeService statistiquesService;

    public StatistiquesBibliothequeController(
            StatistiquesBibliothequeService statistiquesService
    ) {
        this.statistiquesService = statistiquesService;
    }

    @GetMapping("/statistiques")
    public ResponseEntity<StatistiquesBibliothequeResponse>
    consulterStatistiques() {

        return ResponseEntity.ok(
                statistiquesService.consulterStatistiques()
        );
    }
}