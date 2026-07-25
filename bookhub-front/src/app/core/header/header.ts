import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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

  seDeconnecter(): void {
    this.utilisateurService.deconnecter();
    this.router.navigate(['/']);
  }
}
