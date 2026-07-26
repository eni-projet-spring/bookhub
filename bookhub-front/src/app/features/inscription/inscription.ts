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
    if (this.formulaireInscription.invalid) {
      this.formulaireInscription.markAllAsTouched();

      this.messageErreur = 'Veuillez remplir correctement tous les champs.';

      return;
    }

    this.inscriptionEnCours = true;
    this.messageErreur = '';

    const inscriptionRequest = this.formulaireInscription.getRawValue();

    this.utilisateurService.inscription(inscriptionRequest).subscribe({
      next: () => {
        console.log('Inscription réussie');

        this.inscriptionEnCours = false;

        this.router.navigate(['/connexion']);
      },

      error: (erreur) => {
        console.error("Erreur d'inscription :", erreur);

        this.messageErreur = erreur.error?.message ?? "Erreur lors de l'inscription.";

        this.inscriptionEnCours = false;
      },
    });
  }
}
