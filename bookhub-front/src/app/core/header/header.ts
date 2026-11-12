import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormsModule } from '@angular/forms';
import { LivreService } from '../../services/livre';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  categories: string[] = [];
  categorieSelectionnee = '';

  ngOnInit(): void {
    this.livreService.getAllBooks().subscribe({
      next: livres => {
        this.categories = [...new Set(livres.map(livre => livre.libelleCategorie).filter((valeur): valeur is string => !!valeur))].sort((a,b) => a.localeCompare(b, 'fr'));
        this.changeDetectorRef.markForCheck();
      },
      error: () => { this.categories = []; this.changeDetectorRef.markForCheck(); },
    });
  }

  protected messageSucces: string | undefined;
  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private livreService: LivreService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  estConnecte(): boolean {
    return this.utilisateurService.estConnecte();
  }

  estUtilisateur(): boolean {
    const role = this.utilisateurService.getRole();
    return role === 'USER';
  }

  get nomUtilisateurConnecte(): string {
    const compte = this.utilisateurService.obtenirUtilisateurConnecte();
    return compte ? `${compte.prenom} ${compte.nom}`.trim() : '';
  }

  get lienProfil(): string {
    const role = this.utilisateurService.getRole();
    return role === 'ADMIN' ? '/dashboard-administrateur/profil'
      : role === 'LIBRARIAN' ? '/dashboard-bibliothecaire/profil'
      : '/dashboard-lecteur/profil';
  }

  estBibliothecaire(): boolean {
    const role = this.utilisateurService.getRole();
    return role === 'LIBRARIAN';
  }

  estAdministrateur(): boolean {
    return this.utilisateurService.getRole() === 'ADMIN';
  }

  seDeconnecter(): void {
    this.utilisateurService.deconnecter();
    this.router.navigate(['/']);
  }

  onSearch(term: string): void {
    const search = term.trim();
    void this.router.navigate(['/'], {
      queryParams: {
        search: search || null,
        categorie: this.categorieSelectionnee || null,
      },
    });
  }

  onCategorieChange(categorie: string): void {
    this.categorieSelectionnee = categorie;
    const currentSearch = this.router.parseUrl(this.router.url).queryParams['search'];
    void this.router.navigate(['/'], {
      queryParams: {
        search: currentSearch || null,
        categorie: categorie || null,
      },
    });
  }
}

