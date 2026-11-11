import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
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
    if (this.connexionEnCours) {
      return;
    }

    if (this.formulaireConnexion.invalid) {
      this.formulaireConnexion.markAllAsTouched();
      this.messageErreur = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.connexionEnCours = true;
    this.messageErreur = '';

    const connexionRequest = this.formulaireConnexion.getRawValue();
    connexionRequest.email = connexionRequest.email.trim().toLowerCase();

    this.utilisateurService.login(connexionRequest).subscribe({
      next: (connexionResponse) => {
        this.utilisateurService.enregistrerConnexion(connexionResponse);
        this.connexionEnCours = false;

        const destination =
          connexionResponse.role === Role.USER
            ? '/dashboard-lecteur'
            : connexionResponse.role === Role.ADMIN
              ? '/dashboard-administrateur'
              : connexionResponse.role === Role.LIBRARIAN
                ? '/dashboard-bibliothecaire'
                : '/';

        void this.router.navigateByUrl(destination);
      },
      error: (erreur: HttpErrorResponse) => {
        if (erreur.status === 0) {
          this.messageErreur = 'Impossible de contacter le serveur BookHub.';
        } else if (erreur.status === 401) {
          this.messageErreur = 'Adresse email ou mot de passe incorrect.';
        } else {
          this.messageErreur = 'La connexion a échoué. Veuillez réessayer.';
        }
        this.connexionEnCours = false;
      },
    });
  }
}
