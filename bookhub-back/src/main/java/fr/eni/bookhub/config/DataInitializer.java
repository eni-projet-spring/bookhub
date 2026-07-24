package fr.eni.bookhub.config;

import fr.eni.bookhub.entity.Categorie;
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
                LivreRepository livreRepository) {

            return args -> {

                if (categorieRepository.count() == 0) {

                    categorieRepository.save(new Categorie(null, "Roman"));
                    categorieRepository.save(new Categorie(null, "Science-fiction"));
                    categorieRepository.save(new Categorie(null, "Policier"));
                }

            };
        }
    }

