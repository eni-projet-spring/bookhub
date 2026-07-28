import { LivrePopulaire } from './livre-populaire';
import { EmpruntEnRetard } from './emprunt-en-retard';

export interface StatistiquesBibliotheque {
  nombreEmpruntsEnCours: number;
  nombreEmpruntsTotal: number;
  nombreEmpruntsEnRetard: number;
  nombreReservationsEnAttente: number;
  livresPopulaires: LivrePopulaire[];
  empruntsEnRetard: EmpruntEnRetard[];
}
