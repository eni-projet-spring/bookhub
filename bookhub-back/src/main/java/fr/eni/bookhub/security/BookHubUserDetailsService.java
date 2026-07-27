package fr.eni.bookhub.security;

import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.repository.UtilisateurRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BookHubUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    public BookHubUserDetailsService(
            UtilisateurRepository utilisateurRepository
    ) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        String emailNormalise = email.trim();

        Utilisateur utilisateur = utilisateurRepository
                .findByEmailIgnoreCase(emailNormalise)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Aucun utilisateur trouvé avec l’email : "
                                        + emailNormalise
                        )
                );

        return new BookHubUserDetails(utilisateur);
    }
}