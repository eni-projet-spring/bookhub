import { LivrePopulaire } from './livre-populaire';
import { EmpruntResponse } from './emprunt-response';

export interface StatistiquesBibliotheque {
  nombreEmpruntsEnCours: number;
  nombreEmpruntsTotal: number;
  nombreEmpruntsEnRetard: number;
  nombreReservationsEnAttente: number;
  livresPopulaires: LivrePopulaire[];
  empruntsEnRetard: EmpruntResponse[];
}
