import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
  ) {}

  estConnecte(): boolean {
    return this.utilisateurService.estConnecte();
  }

  estUtilisateur(): boolean {
    const role = this.utilisateurService.getRole();
    return role === 'USER' || role === 'ADMIN';
  }

  estBibliothecaire(): boolean {
    const role = this.utilisateurService.getRole();
    return role === 'LIBRARIAN' || role === 'ADMIN';
  }

  seDeconnecter(): void {
    this.utilisateurService.deconnecter();
    this.router.navigate(['/']);
  }

  onSearch(term: string): void {
    const cleanTerm = term.trim();

    // If the user typed something, add it to the URL.
    // If they cleared the box, remove the search parameter.
    const queryParams = cleanTerm ? { search: cleanTerm } : {};

    // Navigate to the home/catalog page with the new URL parameters
    this.router.navigate(['/'], { queryParams });
  }
}
