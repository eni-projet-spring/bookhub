package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.CommentaireRequest;
import fr.eni.bookhub.dto.CommentaireResponse;
import fr.eni.bookhub.entity.Commentaire;
import fr.eni.bookhub.entity.Livre;
import fr.eni.bookhub.entity.Utilisateur;
import fr.eni.bookhub.repository.CommentaireRepository;
import fr.eni.bookhub.repository.EmpruntRepository;
import fr.eni.bookhub.repository.LivreRepository;
import fr.eni.bookhub.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentaireServiceImpl implements CommentaireService {

    private final CommentaireRepository commentaireRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final LivreRepository livreRepository;
    private final EmpruntRepository empruntRepository;

    public CommentaireServiceImpl(
            CommentaireRepository commentaireRepository,
            UtilisateurRepository utilisateurRepository,
            LivreRepository livreRepository,
            EmpruntRepository empruntRepository
    ) {
        this.commentaireRepository = commentaireRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.livreRepository = livreRepository;
        this.empruntRepository = empruntRepository;
    }

    @Override
    @Transactional
    public CommentaireResponse ajouterCommentaireParEmail(
            String email,
            CommentaireRequest dto
    ) {
        Utilisateur utilisateur = rechercherUtilisateurParEmail(email);
        Livre livre = rechercherLivre(dto.getIdLivre());

        boolean livreDejaEmprunteEtRetourne = empruntRepository
                .existsByUtilisateurIdUtilisateurAndExemplaireLivreIdLivreAndDateRetourIsNotNull(
                        utilisateur.getIdUtilisateur(),
                        livre.getIdLivre()
                );

        if (!livreDejaEmprunteEtRetourne) {
            throw new IllegalStateException(
                    "Vous devez avoir emprunté et rendu ce livre avant de pouvoir le commenter."
            );
        }

        boolean commentaireExistant = commentaireRepository
                .existsByUtilisateurIdUtilisateurAndLivreIdLivre(
                        utilisateur.getIdUtilisateur(),
                        livre.getIdLivre()
                );

        if (commentaireExistant) {
            throw new IllegalStateException(
                    "Vous avez déjà publié un commentaire pour ce livre."
            );
        }

        Commentaire commentaire = new Commentaire();

        commentaire.setTexte(dto.getTexte().trim());
        commentaire.setNote(dto.getNote());
        commentaire.setUtilisateur(utilisateur);
        commentaire.setLivre(livre);

        Commentaire commentaireEnregistre =
                commentaireRepository.save(commentaire);

        return convertToDto(commentaireEnregistre);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentaireResponse>
    listerCommentairesUtilisateurParEmail(String email) {

        rechercherUtilisateurParEmail(email);

        return commentaireRepository
                .findByUtilisateurEmailOrderByDatePublicationDesc(email)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentaireResponse> listerCommentairesLivre(
            Integer idLivre
    ) {
        rechercherLivre(idLivre);

        return commentaireRepository
                .findByLivreIdLivreOrderByDatePublicationDesc(idLivre)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    @Transactional
    public CommentaireResponse modifierCommentaireParEmail(
            Integer idCommentaire,
            String email,
            CommentaireRequest dto
    ) {
        Commentaire commentaire =
                rechercherCommentaire(idCommentaire);

        verifierProprietaire(commentaire, email);

        /*
         * Le livre associé au commentaire ne change pas.
         * Le champ idLivre du DTO sert principalement à la création.
         */
        commentaire.setTexte(dto.getTexte().trim());
        commentaire.setNote(dto.getNote());

        Commentaire commentaireModifie =
                commentaireRepository.save(commentaire);

        return convertToDto(commentaireModifie);
    }

    @Override
    @Transactional
    public void supprimerCommentaireParEmail(
            Integer idCommentaire,
            String email
    ) {
        Commentaire commentaire =
                rechercherCommentaire(idCommentaire);

        verifierProprietaire(commentaire, email);

        commentaireRepository.delete(commentaire);
    }

    private Utilisateur rechercherUtilisateurParEmail(String email) {
        return utilisateurRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utilisateur introuvable avec l'email : "
                                + email
                ));
    }

    private Livre rechercherLivre(Integer idLivre) {
        return livreRepository
                .findById(idLivre)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Livre introuvable avec l'identifiant : "
                                + idLivre
                ));
    }

    private Commentaire rechercherCommentaire(
            Integer idCommentaire
    ) {
        return commentaireRepository
                .findById(idCommentaire)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Commentaire introuvable avec l'identifiant : "
                                + idCommentaire
                ));
    }

    private void verifierProprietaire(
            Commentaire commentaire,
            String email
    ) {
        String emailProprietaire = commentaire
                .getUtilisateur()
                .getEmail();

        if (!emailProprietaire.equalsIgnoreCase(email)) {
            throw new IllegalStateException(
                    "Vous ne pouvez pas modifier ou supprimer le commentaire d'un autre utilisateur."
            );
        }
    }

    private CommentaireResponse convertToDto(
            Commentaire commentaire
    ) {
        CommentaireResponse dto = new CommentaireResponse();

        dto.setIdCommentaire(
                commentaire.getIdCommentaire()
        );

        dto.setTexte(
                commentaire.getTexte()
        );

        dto.setNote(
                commentaire.getNote()
        );

        dto.setDatePublication(
                commentaire.getDatePublication()
        );

        if (commentaire.getLivre() != null) {
            dto.setIdLivre(
                    commentaire.getLivre().getIdLivre()
            );

            dto.setTitreLivre(
                    commentaire.getLivre().getTitre()
            );

            dto.setAuteur(
                    commentaire.getLivre().getAuteur()
            );
        }

        if (commentaire.getUtilisateur() != null) {
            dto.setNomUtilisateur(
                    commentaire.getUtilisateur().getNom()
            );

            dto.setPrenomUtilisateur(
                    commentaire.getUtilisateur().getPrenom()
            );
        }

        return dto;
    }
}