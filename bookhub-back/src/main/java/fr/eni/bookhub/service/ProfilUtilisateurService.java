package fr.eni.bookhub.service;

import fr.eni.bookhub.dto.ProfilUtilisateurDTO;

public interface ProfilUtilisateurService {
   ProfilUtilisateurDTO getProfilByEmail(String email);
   ProfilUtilisateurDTO editProfil(String email, ProfilUtilisateurDTO dto);
   void deleteProfil(String email);
}