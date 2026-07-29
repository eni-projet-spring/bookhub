import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LivreResponse, LivreService } from '../../services/livre';

@Component({
  selector: 'app-livre-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './livre-detail.html',
  styleUrl: './livre-detail.css',
})
export class LivreDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly livreService = inject(LivreService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  livre?: LivreResponse;

  chargement = true;
  erreur = '';
  suppressionEnCours = false;

  estConnecte = false;
  roleUtilisateur: string | null = null;

  ngOnInit(): void {
    this.initialiserUtilisateur();
    this.chargerLivre();
  }

  get peutGererLivre(): boolean {
    return this.roleUtilisateur === 'ADMIN' || this.roleUtilisateur === 'LIBRARIAN';
  }

  private initialiserUtilisateur(): void {
    const token = localStorage.getItem('token');

    this.estConnecte = token !== null;

    if (!token) {
      this.roleUtilisateur = null;
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      if (typeof payload.role === 'string') {
        this.roleUtilisateur = this.nettoyerRole(payload.role);
        return;
      }

      if (Array.isArray(payload.roles) && payload.roles.length > 0) {
        this.roleUtilisateur = this.nettoyerRole(payload.roles[0]);
        return;
      }

      if (Array.isArray(payload.authorities) && payload.authorities.length > 0) {
        const autorite = payload.authorities[0];

        this.roleUtilisateur = this.nettoyerRole(
          typeof autorite === 'string' ? autorite : autorite.authority,
        );
      }
    } catch (error) {
      console.error('Impossible de lire le rôle contenu dans le JWT', error);

      this.roleUtilisateur = null;
    }
  }

  private nettoyerRole(role: string): string {
    return role.replace('ROLE_', '').toUpperCase();
  }

  private chargerLivre(): void {
    const parametreId = this.route.snapshot.paramMap.get('id');
    const idLivre = Number(parametreId);

    if (!Number.isInteger(idLivre) || idLivre <= 0) {
      this.erreur = 'Identifiant du livre invalide.';
      this.chargement = false;
      this.changeDetectorRef.markForCheck();
      return;
    }

    this.chargement = true;
    this.erreur = '';

    this.livreService.getBookById(idLivre).subscribe({
      next: (livre: LivreResponse) => {
        this.livre = livre;
        this.chargement = false;

        this.changeDetectorRef.markForCheck();
      },

      error: (error: HttpErrorResponse) => {
        console.error('Erreur API lors du chargement du livre :', error);

        if (error.status === 404) {
          this.erreur = 'Le livre demandé est introuvable.';
        } else if (error.status === 401) {
          this.erreur = 'Vous devez vous connecter pour consulter ce livre.';
        } else if (error.status === 403) {
          this.erreur = 'L’accès au détail du livre est refusé.';
        } else if (error.status === 0) {
          this.erreur = 'Impossible de contacter le serveur BookHub.';
        } else {
          this.erreur = `Erreur lors du chargement du livre (${error.status}).`;
        }

        this.chargement = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  supprimerLivre(): void {
    if (!this.livre || !this.peutGererLivre || this.suppressionEnCours) {
      return;
    }

    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer le livre « ${this.livre.titre} » ?`,
    );

    if (!confirmation) {
      return;
    }

    this.suppressionEnCours = true;
    this.erreur = '';

    this.livreService.deleteBook(this.livre.idLivre).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },

      error: (error: HttpErrorResponse) => {
        console.error('Erreur lors de la suppression du livre', error);

        this.erreur =
          'Le livre ne peut pas être supprimé. Il possède peut-être encore des exemplaires, emprunts ou réservations.';

        this.suppressionEnCours = false;
      },
    });
  }
}

