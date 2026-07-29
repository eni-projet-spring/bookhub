package fr.eni.bookhub.config;

import fr.eni.bookhub.entity.Categorie;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.repository.CategorieRepository;
import fr.eni.bookhub.repository.LivreRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

        @Bean
        CommandLineRunner init(
                CategorieRepository categorieRepository,
                LivreRepository livreRepository
        ) {
            return args -> {

                Categorie roman;

                if (categorieRepository.count() == 0) {
                    roman = categorieRepository.save(
                            new Categorie(null, "Roman")
                    );

                    categorieRepository.save(
                            new Categorie(null, "Science-fiction")
                    );

                    categorieRepository.save(
                            new Categorie(null, "Policier")
                    );
                } else {
                    roman = categorieRepository.findAll()
                            .stream()
                            .filter(categorie ->
                                    categorie.getLibelle().equals("Roman")
                            )
                            .findFirst()
                            .orElseThrow();
                }

                if (livreRepository.count() == 0) {

                    Livre livre = new Livre();

                    livre.setIsbn("9782070360024");
                    livre.setTitre("L'Étranger");
                    livre.setAuteur("Albert Camus");
                    livre.setEdition("Gallimard");
                    livre.setDescription("Roman d'Albert Camus");
                    livre.setCouverture("https://exemple.fr/etranger.jpg");
                    livre.setCategorie(roman);

                    livreRepository.save(livre);

                    System.out.println("Livre de test créé");
                }
            };
        }
    }
