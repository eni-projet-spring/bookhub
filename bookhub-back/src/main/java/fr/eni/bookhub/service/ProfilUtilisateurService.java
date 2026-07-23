package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.ProfilUtilisateurDTO;
import fr.eni.bookhub.entity.Utilisateur;

import java.util.List;

public interface ProfilUtilisateurService {
   Utilisateur getProfilUtilisateurById(Integer idUtilisateur);

   List<Utilisateur> getAllUtilisateurs();

   Utilisateur editUtilisateur(Integer idUtilisateur, ProfilUtilisateurDTO dto);

   Utilisateur deleteUtilisateurById(Integer idUtilisateur);

}
