import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { UtilisateurResponse } from '../../models/utilisateur-response.model';
import { Role } from '../../models/role';
import { IndicateursAdministrateur, IndicateursAdministrateurService } from '../../services/indicateurs-administrateur.service';

/** Tableau administrateur : navigation et tuiles calquées sur le dashboard lecteur. */
@Component({
  selector: 'app-dashboard-administrateur-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-administrateur-accueil.html',
  styleUrls: [
    '../dashboard-lecteur/dashboard-lecteur-accueil/dashboard-lecteur-accueil.css',
    './dashboard-administrateur-accueil.css',
  ],
})
export class DashboardAdministrateurAccueil implements OnInit {
  private readonly comptesService = inject(UtilisateurService);
  private readonly indicateursService = inject(IndicateursAdministrateurService);
  private readonly cdr = inject(ChangeDetectorRef);
  utilisateurs: UtilisateurResponse[] = [];
  indicateurs: IndicateursAdministrateur | null = null;
  chargementComptes = true;
  chargementIndicateurs = true;
  erreurComptes = '';
  erreurIndicateurs = '';

  get total(): number { return this.utilisateurs.length; }
  get lecteurs(): number { return this.compter(Role.USER); }
  get bibliothecaires(): number { return this.compter(Role.LIBRARIAN); }
  get administrateurs(): number { return this.compter(Role.ADMIN); }

  private compter(role: Role): number {
    return this.utilisateurs.filter(u => u.role === role).length;
  }

  ngOnInit(): void { this.actualiser(); }
  actualiser(): void {
    this.chargementComptes = true;
    this.chargementIndicateurs = true;
    this.erreurComptes = '';
    this.erreurIndicateurs = '';
    this.comptesService.listerUtilisateurs().subscribe({
      next: utilisateurs => {
        this.utilisateurs = utilisateurs;
        this.chargementComptes = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreurComptes = 'Les comptes sont indisponibles.';
        this.chargementComptes = false;
        this.cdr.markForCheck();
      },
    });
    this.indicateursService.consulter().subscribe({
      next: indicateurs => {
        this.indicateurs = indicateurs;
        this.chargementIndicateurs = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreurIndicateurs = 'Les indicateurs métier sont indisponibles.';
        this.chargementIndicateurs = false;
        this.cdr.markForCheck();
      },
    });
  }
}
