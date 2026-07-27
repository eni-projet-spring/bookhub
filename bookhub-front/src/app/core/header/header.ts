import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
}
