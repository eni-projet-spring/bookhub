import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmpruntResponse } from '../../../models/emprunt-response';
import { ReservationResponse } from '../../../models/reservation-response';
import { LivreResponse, LivreService } from '../../../services/livre';
import { EmpruntService } from '../../../services/emprunt-service';
import { ReservationService } from '../../../services/reservation.service';

/** Tableau de bord alimenté par les API du lecteur connecté, sans données fictives. */
@Component({
  selector: 'app-dashboard-lecteur-accueil',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard-lecteur-accueil.html',
  styleUrl: './dashboard-lecteur-accueil.css',
})
export class DashboardLecteurAccueil implements OnInit {
  private readonly empruntService = inject(EmpruntService);
  private readonly reservationService = inject(ReservationService);
  private readonly livreService = inject(LivreService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly backendBaseUrl = 'http://localhost:8080';

  readonly currentDate = new Date();
  emprunts: EmpruntResponse[] = [];
  reservations: ReservationResponse[] = [];
  livres: LivreResponse[] = [];
  chargementEmprunts = true;
  chargementReservations = true;
  chargementLivres = true;
  erreurEmprunts = '';
  erreurReservations = '';
  erreurLivres = '';

  ngOnInit(): void {
    // L'API détermine l'utilisateur à partir du JWT, sans ID fourni par le navigateur.
    this.empruntService.consulterMesEmprunts().subscribe({
      next: (emprunts) => {
        this.emprunts = emprunts;
        this.chargementEmprunts = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreurEmprunts = 'Impossible de charger vos emprunts.';
        this.chargementEmprunts = false;
        this.cdr.markForCheck();
      },
    });

    this.reservationService.listerMesReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.chargementReservations = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreurReservations = 'Impossible de charger vos réservations.';
        this.chargementReservations = false;
        this.cdr.markForCheck();
      },
    });

    // La catégorie n'étant pas incluse dans l'API emprunts, on la joint par ISBN.
    this.livreService.getAllBooks().subscribe({
      next: (livres) => {
        this.livres = livres;
        this.chargementLivres = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreurLivres = 'Répartition par catégorie indisponible.';
        this.chargementLivres = false;
        this.cdr.markForCheck();
      },
    });
  }

  get empruntsEnCours(): EmpruntResponse[] {
    return this.emprunts.filter((e) => e.statut !== 'RETOURNE' && !e.dateRetour);
  }

  /** L'API calcule le retard selon dateFinPrevue et dateRetour. */
  get empruntsEnRetard(): EmpruntResponse[] {
    return this.empruntsEnCours.filter((e) => e.statut === 'EN_RETARD');
  }

  get empruntsProchains(): EmpruntResponse[] {
    const debut = new Date();
    debut.setHours(0, 0, 0, 0);
    const fin = new Date(debut);
    fin.setDate(fin.getDate() + 7);
    // Dates comparées comme instants, indépendamment du format local Safari.
    return this.empruntsEnCours.filter((e) => {
      if (e.statut === 'EN_RETARD') return false;
      const dateRetourPrevue = new Date(e.dateFinPrevue).getTime();
      return Number.isFinite(dateRetourPrevue) &&
        dateRetourPrevue >= debut.getTime() && dateRetourPrevue < fin.getTime();
    });
  }

  get empruntsRetournes(): number {
    return this.emprunts.filter((e) => e.statut === 'RETOURNE' || !!e.dateRetour).length;
  }

  get reservationsActives(): ReservationResponse[] {
    return this.reservations.filter((r) =>
      r.statut === 'EN_ATTENTE' || r.statut === 'DISPONIBLE');
  }

  get reservationsDisponibles(): ReservationResponse[] {
    return this.reservations.filter((r) => r.statut === 'DISPONIBLE');
  }

  /** Comptage sur les emprunts associés à un ISBN présent dans le catalogue. */
  get repartitionCategories(): { nom: string; nombre: number; pourcentage: number }[] {
    const catalogParIsbn = new Map(this.livres.map((livre) => [livre.isbn, livre]));
    const compte = new Map<string, number>();
    for (const emprunt of this.emprunts) {
      const nom = catalogParIsbn.get(emprunt.isbn)?.libelleCategorie;
      if (nom) compte.set(nom, (compte.get(nom) || 0) + 1);
    }
    const total = [...compte.values()].reduce((somme, n) => somme + n, 0);
    return [...compte.entries()]
      .map(([nom, nombre]) => ({
        nom, nombre, pourcentage: total ? Math.round(nombre * 100 / total) : 0,
      }))
      .sort((a, b) => b.nombre - a.nombre);
  }

  get nombreLecturesClassees(): number {
    return this.repartitionCategories.reduce((somme, c) => somme + c.nombre, 0);
  }

  /** Diagramme construit avec les proportions réelles des catégories. */
  get graphiqueCategories(): string {
    const couleurs = ['var(--color-primary)', 'var(--color-success)',
      'var(--color-highlight)', 'var(--color-accent)', 'var(--color-text)'];
    const repartition = this.repartitionCategories;
    const total = repartition.reduce((somme, categorie) => somme + categorie.nombre, 0);
    if (!total) return 'var(--color-surface)';
    let position = 0;
    const secteurs = repartition.map((categorie, index) => {
      const debut = position;
      position += categorie.nombre * 100 / total;
      return `${couleurs[index % couleurs.length]} ${debut}% ${position}%`;
    });
    return `radial-gradient(circle, var(--color-surface) 0 42%, transparent 43%), conic-gradient(${secteurs.join(', ')})`;
  }

  /** Normalise les chemins de couvertures comme dans le catalogue. */
  getCoverImageUrl(couverture: string | null | undefined): string {
    if (!couverture) return '';
    if (/^https?:\/\//i.test(couverture)) return couverture;
    return `${this.backendBaseUrl}/${couverture.replace(/^\/+/, '')}`;
  }
}
