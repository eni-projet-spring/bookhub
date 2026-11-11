export interface EmpruntResponse {
  idEmprunt: number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  titreLivre: string;
  isbn: string;
  dateDebut: string;
  dateFinPrevue: string;
  dateRetour: string | null;
  statut: 'EN_COURS' | 'EN_RETARD' | 'RETOURNE';
  nombreJoursRetard: number;
  auteurLivre?: string | null;
  couvertureLivre?: string | null;
}
