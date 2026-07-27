export interface ReservationResponse {
  idReservation: number;
  dateDemande: string;
  statut: 'EN_ATTENTE' | 'DISPONIBLE' | 'ANNULEE' | 'TERMINEE';
  disponibilite: boolean;
  positionFileAttente: number;
  idUtilisateur: number;
  idLivre: number;
  titreLivre: string;
  isbn: string;
}
