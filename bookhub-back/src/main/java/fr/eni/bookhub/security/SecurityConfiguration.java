package fr.eni.bookhub.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                /*
                 * Le backend utilise un JWT et non une session avec formulaire.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                 * Utilise le bean corsConfigurationSource défini plus bas.
                 */
                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                /*
                 * Aucune session n'est conservée côté serveur.
                 * Chaque requête protégée doit contenir son JWT.
                 */
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                /*
                 * Routes publiques et routes protégées.
                 */
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/utilisateurs/login",
                                "/api/utilisateurs/inscription"
                        )
                        .permitAll()

                        /*
                         * Autorise les requêtes CORS de pré-vérification.
                         */
                        .requestMatchers(
                                org.springframework.http.HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()

                        /*
                         * Toutes les autres routes nécessitent un JWT valide.
                         */
                        .anyRequest()
                        .authenticated()
                )

                /*
                 * Active la lecture et la validation du JWT Bearer.
                 */
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(Customizer.withDefaults())
                )

                /*
                 * Désactive les modes de connexion Spring classiques.
                 */
                .formLogin(form -> form.disable())
                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:4200")
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept"
                )
        );

        /*
         * Permet au navigateur de lire certains en-têtes de réponse.
         * Ce n'est pas indispensable si le JWT est dans le corps JSON,
         * mais c'est utile si tu exposes ensuite Authorization.
         */
        configuration.setExposedHeaders(
                List.of("Authorization")
        );

        configuration.setAllowCredentials(true);

        /*
         * Durée pendant laquelle le navigateur peut conserver
         * le résultat de la requête CORS OPTIONS.
         */
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}