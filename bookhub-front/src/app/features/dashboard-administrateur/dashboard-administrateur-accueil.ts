import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { UtilisateurResponse } from '../../models/utilisateur-response.model';
import { Role } from '../../models/role';

/** Indicateurs réels des comptes, chargés via l'API réservée à ADMIN. */
@Component({
  selector: 'app-dashboard-administrateur-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-administrateur-accueil.html',
  styleUrl: './dashboard-administrateur-accueil.css',
})
export class DashboardAdministrateurAccueil implements OnInit {
  private readonly service = inject(UtilisateurService);
  private readonly cdr = inject(ChangeDetectorRef);
  utilisateurs: UtilisateurResponse[] = [];
  chargement = false;
  erreur = '';

  get total(): number { return this.utilisateurs.length; }
  get lecteurs(): number { return this.compter(Role.USER); }
  get bibliothecaires(): number { return this.compter(Role.LIBRARIAN); }
  get administrateurs(): number { return this.compter(Role.ADMIN); }

  private compter(role: Role): number {
    return this.utilisateurs.filter((utilisateur) => utilisateur.role === role).length;
  }

  ngOnInit(): void { this.actualiser(); }
  actualiser(): void {
    this.chargement = true;
    this.erreur = '';
    this.service.listerUtilisateurs().subscribe({
      next: (utilisateurs) => {
        this.utilisateurs = utilisateurs;
        this.chargement = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Impossible de charger les comptes utilisateurs.';
        this.chargement = false;
        this.cdr.markForCheck();
      },
    });
  }
}
