import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  livre?: LivreResponse;

  chargement = true;
  erreur = '';
  suppressionEnCours = false;

  /*
   * Version provisoire.
   *
   * Il faudra ensuite récupérer ces informations depuis
   * votre service d'authentification existant.
   */
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
    /*
     * Adapte uniquement le nom de la clé si votre JWT
     * n'est pas enregistré sous "token".
     */
    const token = localStorage.getItem('token');

    this.estConnecte = token !== null;

    if (!token) {
      this.roleUtilisateur = null;
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      /*
       * Selon votre backend, le rôle peut se trouver dans :
       * payload.role
       * payload.roles
       * payload.authorities
       */
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
    const idLivre = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(idLivre) || idLivre <= 0) {
      this.erreur = 'Identifiant du livre invalide.';
      this.chargement = false;
      return;
    }

    this.livreService.getBookById(idLivre).subscribe({
      next: (livre) => {
        this.livre = livre;
        this.chargement = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du livre', error);

        this.erreur = 'Le livre demandé est introuvable ou indisponible.';

        this.chargement = false;
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
      error: (error) => {
        console.error('Erreur lors de la suppression du livre', error);

        this.erreur =
          'Le livre ne peut pas être supprimé. Il possède peut-être encore des exemplaires, emprunts ou réservations.';

        this.suppressionEnCours = false;
      },
    });
  }
}
