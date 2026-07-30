import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  messageErreur = '';
  connexionEnCours = false;

  formulaireConnexion = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    motDePasse: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
  ) {}

  seConnecter(): void {
    if (this.formulaireConnexion.invalid) {
      this.formulaireConnexion.markAllAsTouched();
      this.messageErreur = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.connexionEnCours = true;
    this.messageErreur = '';

    const connexionRequest = this.formulaireConnexion.getRawValue();

    this.utilisateurService.login(connexionRequest).subscribe({
      next: (connexionResponse) => {
        console.log('Connexion réussie');

        this.utilisateurService.enregistrerConnexion(connexionResponse);

        this.connexionEnCours = false;

        if (connexionResponse.role === 'LIBRARIAN' || connexionResponse.role === 'ADMIN') {
          this.router.navigate(['/dashboard-bibliothecaire']);
        } else {
          this.router.navigate(['/']);
        }
      },

      error: (erreur) => {
        console.error('Erreur de connexion :', erreur);

        this.messageErreur = erreur.error?.message ?? 'Email ou mot de passe incorrect.';

        this.connexionEnCours = false;
      },
    });
  }
}
