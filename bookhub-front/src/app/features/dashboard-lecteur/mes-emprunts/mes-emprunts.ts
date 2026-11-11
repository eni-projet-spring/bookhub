import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { EmpruntResponse } from '../../../models/emprunt-response';
import { EmpruntService } from '../../../services/emprunt-service';

@Component({
  selector: 'app-mes-emprunts',
  imports: [CommonModule],
  templateUrl: './mes-emprunts.html',
  styleUrl: './mes-emprunts.css',
})
export class MesEmprunts implements OnInit {
  private readonly empruntService = inject(EmpruntService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly backendBaseUrl = 'http://localhost:8080';

  emprunts: EmpruntResponse[] = [];
  chargementEnCours = true;
  messageErreur = '';

  ngOnInit(): void {
    this.chargerEmprunts();
  }

  chargerEmprunts(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    this.empruntService.consulterMesEmprunts().subscribe({
      next: (emprunts) => {
        this.emprunts = emprunts;
        this.chargementEnCours = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (erreur: HttpErrorResponse) => {
        this.messageErreur = erreur.status === 401
          ? 'Votre session a expiré. Veuillez vous reconnecter.'
          : erreur.status === 403
            ? 'Vous n’êtes pas autorisé à consulter ces emprunts.'
            : erreur.status === 0
              ? 'Impossible de contacter le serveur BookHub.'
              : 'Impossible de charger vos emprunts.';
        this.chargementEnCours = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  get empruntsEnCours(): EmpruntResponse[] {
    return this.emprunts.filter((emprunt) => emprunt.statut !== 'RETOURNE');
  }

  get empruntsEnRetard(): number {
    return this.empruntsEnCours.filter((emprunt) => emprunt.statut === 'EN_RETARD').length;
  }

  get empruntsARendreProchainement(): number {
    const maintenant = Date.now();
    const dansSeptJours = maintenant + 7 * 24 * 60 * 60 * 1000;
    return this.empruntsEnCours.filter((emprunt) => {
      if (emprunt.statut === 'EN_RETARD') return false;
      const date = new Date(emprunt.dateFinPrevue).getTime();
      return Number.isFinite(date) && date >= maintenant && date <= dansSeptJours;
    }).length;
  }

  getCoverImageUrl(couverture: string | null | undefined): string {
    if (!couverture) return '';
    if (couverture.startsWith('http://') || couverture.startsWith('https://')) {
      return couverture;
    }
    return `${this.backendBaseUrl}/${couverture.replace(/^\/+/, '')}`;
  }
}
