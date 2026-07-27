import { EmpruntEnRetard, LivrePopulaire } from './livre-populaire';

export interface StatistiquesBibliotheque {
  nombreEmpruntsEnCours: number;
  nombreEmpruntsTotal: number;
  nombreEmpruntsEnRetard: number;
  nombreReservationsEnAttente: number;
  livresPopulaires: LivrePopulaire[];
  empruntsEnRetard: EmpruntEnRetard[];
}
