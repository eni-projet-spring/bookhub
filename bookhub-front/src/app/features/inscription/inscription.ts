import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  messageErreur = '';
  messageSucces = '';
  inscriptionEnCours = false;

  formulaireInscription = new FormGroup({
    nom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    prenom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    motDePasse: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),

    confirmationMotDePasse: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
  ) {}

  sInscrire(): void {
    this.messageErreur = '';
    this.messageSucces = '';

    if (this.formulaireInscription.invalid) {
      this.formulaireInscription.markAllAsTouched();

      this.messageErreur = 'Veuillez remplir correctement tous les champs.';

      return;
    }

    const inscriptionRequest = this.formulaireInscription.getRawValue();

    if (inscriptionRequest.motDePasse !== inscriptionRequest.confirmationMotDePasse) {
      this.messageErreur = 'Les mots de passe ne correspondent pas.';

      return;
    }

    this.inscriptionEnCours = true;

    this.utilisateurService.inscription(inscriptionRequest).subscribe({
      next: () => {
        this.inscriptionEnCours = false;

        this.messageSucces =
          'Votre inscription a bien été enregistrée. Vous pouvez maintenant vous connecter.';

        this.formulaireInscription.reset();

        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 2000);
      },

      error: (erreur) => {
        console.error("Erreur lors de l'inscription :", erreur);

        this.messageErreur = erreur.error?.message ?? "Erreur lors de l'inscription.";

        this.inscriptionEnCours = false;
      },
    });
  }
}
