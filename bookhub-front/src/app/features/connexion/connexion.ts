import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    email: new FormControl('', [Validators.required, Validators.email]),

    motDePasse: new FormControl('', [Validators.required]),
  });

  seConnecter(): void {
    if (this.formulaireConnexion.invalid) {
      this.formulaireConnexion.markAllAsTouched();
      this.messageErreur = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.connexionEnCours = true;
    this.messageErreur = '';

    console.log(this.formulaireConnexion.value);

    this.connexionEnCours = false;
  }
}
