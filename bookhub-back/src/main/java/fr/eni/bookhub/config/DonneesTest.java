package fr.eni.bookhub.config;

import fr.eni.bookhub.entity.Role;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DonneesTest {

    @Bean
    CommandLineRunner creerUtilisateurTest(
            UtilisateurRepository utilisateurRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String emailTest = "test@bookhub.fr";

            if (utilisateurRepository
                    .findByEmail(emailTest)
                    .isEmpty()) {

                Utilisateur utilisateur = new Utilisateur();

                utilisateur.setNom("Test");
                utilisateur.setPrenom("Utilisateur");
                utilisateur.setEmail(emailTest);
                utilisateur.setMotDePasse(
                        passwordEncoder.encode("1234")
                );
                utilisateur.setRole(Role.USER);

                utilisateurRepository.save(utilisateur);

                System.out.println(
                        "Utilisateur de test créé : test@bookhub.fr / 1234"
                );
            }
        };
    }
}