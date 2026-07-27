package fr.eni.bookhub;

import fr.eni.bookhub.dto.InscriptionUtilisateurDto;
import fr.eni.bookhub.entity.Role;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.exception.IdentifiantsInvalidesException;
import fr.eni.bookhub.repository.UtilisateurRepository;
import fr.eni.bookhub.service.UtilisateurServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UtilisateurServiceImplTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    private UtilisateurServiceImpl utilisateurService;

    @BeforeEach
    void setUp() {
        utilisateurService =
                new UtilisateurServiceImpl(utilisateurRepository);
    }

    @Test
    void connecterDoitRetournerUtilisateurQuandIdentifiantsCorrects() {
        // ARRANGE
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setIdUtilisateur(1);
        utilisateur.setEmail("test@test.fr");
        utilisateur.setMotDePasse("1234");
        utilisateur.setRole(Role.USER);

        when(utilisateurRepository.findByEmail("test@test.fr"))
                .thenReturn(Optional.of(utilisateur));

        // ACT
        Utilisateur resultat = utilisateurService.connecter(
                "test@test.fr",
                "1234"
        );

        // ASSERT
        assertNotNull(resultat);
        assertEquals("test@test.fr", resultat.getEmail());
        assertEquals(Role.USER, resultat.getRole());

        verify(utilisateurRepository).findByEmail("test@test.fr");
    }

    @Test
    void connecterDoitLeverExceptionQuandEmailInconnu() {
        // ARRANGE
        when(utilisateurRepository.findByEmail("inconnu@test.fr"))
                .thenReturn(Optional.empty());

        // ACT + ASSERT
        IdentifiantsInvalidesException exception = assertThrows(
                IdentifiantsInvalidesException.class,
                () -> utilisateurService.connecter(
                        "inconnu@test.fr",
                        "1234"
                )
        );

        assertEquals(
                "Email ou mot de passe incorrect",
                exception.getMessage()
        );

        verify(utilisateurRepository)
                .findByEmail("inconnu@test.fr");
    }

    @Test
    void connecterDoitLeverExceptionQuandMotDePasseIncorrect() {
        // ARRANGE
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("test@test.fr");
        utilisateur.setMotDePasse("1234");

        when(utilisateurRepository.findByEmail("test@test.fr"))
                .thenReturn(Optional.of(utilisateur));

        // ACT + ASSERT
        IdentifiantsInvalidesException exception = assertThrows(
                IdentifiantsInvalidesException.class,
                () -> utilisateurService.connecter(
                        "test@test.fr",
                        "mauvaisMotDePasse"
                )
        );

        assertEquals(
                "Email ou mot de passe incorrect",
                exception.getMessage()
        );

        verify(utilisateurRepository)
                .findByEmail("test@test.fr");
    }

    @Test
    void inscrireDoitCreerUnUtilisateur() {
        // ARRANGE
        InscriptionUtilisateurDto dto =
                new InscriptionUtilisateurDto(
                        " Dupont ",
                        " Jean ",
                        " JEAN.DUPONT@TEST.FR ",
                        "1234",
                        "1234"
                );

        when(utilisateurRepository.existsByEmail(dto.getEmail()))
                .thenReturn(false);

        when(utilisateurRepository.save(any(Utilisateur.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0)
                );

        // ACT
        Utilisateur resultat =
                utilisateurService.inscrire(dto);

        // ASSERT
        assertNotNull(resultat);
        assertEquals("Dupont", resultat.getNom());
        assertEquals("Jean", resultat.getPrenom());
        assertEquals(
                "jean.dupont@test.fr",
                resultat.getEmail()
        );
        assertEquals("1234", resultat.getMotDePasse());
        assertEquals(Role.USER, resultat.getRole());

        verify(utilisateurRepository)
                .existsByEmail(dto.getEmail());

        verify(utilisateurRepository)
                .save(any(Utilisateur.class));
    }

    @Test
    void inscrireDoitSauvegarderUtilisateurAvecLesBonnesValeurs() {
        // ARRANGE
        InscriptionUtilisateurDto dto =
                new InscriptionUtilisateurDto(
                        " Martin ",
                        " Alice ",
                        " ALICE@TEST.FR ",
                        "abcd",
                        "abcd"
                );

        when(utilisateurRepository.existsByEmail(dto.getEmail()))
                .thenReturn(false);

        when(utilisateurRepository.save(any(Utilisateur.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0)
                );

        ArgumentCaptor<Utilisateur> captor =
                ArgumentCaptor.forClass(Utilisateur.class);

        // ACT
        utilisateurService.inscrire(dto);

        // ASSERT
        verify(utilisateurRepository).save(captor.capture());

        Utilisateur utilisateurSauvegarde =
                captor.getValue();

        assertEquals(
                "Martin",
                utilisateurSauvegarde.getNom()
        );
        assertEquals(
                "Alice",
                utilisateurSauvegarde.getPrenom()
        );
        assertEquals(
                "alice@test.fr",
                utilisateurSauvegarde.getEmail()
        );
        assertEquals(
                "abcd",
                utilisateurSauvegarde.getMotDePasse()
        );
        assertEquals(
                Role.USER,
                utilisateurSauvegarde.getRole()
        );
    }

    @Test
    void inscrireDoitLeverExceptionQuandMotsDePasseDifferents() {
        // ARRANGE
        InscriptionUtilisateurDto dto =
                new InscriptionUtilisateurDto(
                        "Dupont",
                        "Jean",
                        "jean@test.fr",
                        "1234",
                        "5678"
                );

        // ACT + ASSERT
        IdentifiantsInvalidesException exception =
                assertThrows(
                        IdentifiantsInvalidesException.class,
                        () -> utilisateurService.inscrire(dto)
                );

        assertEquals(
                "Les mots de passe ne correspondent pas",
                exception.getMessage()
        );

        verify(utilisateurRepository, never())
                .existsByEmail(anyString());

        verify(utilisateurRepository, never())
                .save(any(Utilisateur.class));
    }

    @Test
    void inscrireDoitLeverExceptionQuandEmailExisteDeja() {
        // ARRANGE
        InscriptionUtilisateurDto dto =
                new InscriptionUtilisateurDto(
                        "Dupont",
                        "Jean",
                        "jean@test.fr",
                        "1234",
                        "1234"
                );

        when(utilisateurRepository.existsByEmail(dto.getEmail()))
                .thenReturn(true);

        // ACT + ASSERT
        IdentifiantsInvalidesException exception =
                assertThrows(
                        IdentifiantsInvalidesException.class,
                        () -> utilisateurService.inscrire(dto)
                );

        assertEquals(
                "Cette adresse email est déjà utilisée",
                exception.getMessage()
        );

        verify(utilisateurRepository)
                .existsByEmail(dto.getEmail());

        verify(utilisateurRepository, never())
                .save(any(Utilisateur.class));
    }
}