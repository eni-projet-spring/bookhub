import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmpruntResponse } from '../../models/emprunt-response';
import { EmpruntService } from '../../services/emprunt-service';

/** Historique réel : uniquement les emprunts dont le retour a été enregistré. */
@Component({
  selector: 'app-mon-historique',
  imports: [DatePipe, RouterLink],
  templateUrl: './mon-historique.html',
  styleUrl: './mon-historique.css',
})
export class MonHistorique implements OnInit {
  private readonly empruntService = inject(EmpruntService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly backendBaseUrl = 'http://localhost:8080';

  emprunts: EmpruntResponse[] = [];
  chargement = true;
  erreur = '';

  ngOnInit(): void {
    // L'API ne renvoie que les emprunts de l'utilisateur authentifié.
    this.empruntService.consulterMesEmprunts().subscribe({
      next: (emprunts) => {
        this.emprunts = emprunts.filter((e) => e.statut === 'RETOURNE' || !!e.dateRetour);
        this.chargement = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Impossible de charger votre historique.';
        this.chargement = false;
        this.cdr.markForCheck();
      },
    });
  }

  getCoverImageUrl(couverture: string | null | undefined): string {
    if (!couverture) return '';
    if (/^https?:\/\//i.test(couverture)) return couverture;
    return `${this.backendBaseUrl}/${couverture.replace(/^\/+/, '')}`;
  }
}
