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

  // Création du formulaire
  formulaireConnexion = new FormGroup({

    // Champ email
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    // Champ mot de passe
    motDePasse: new FormControl('', [
      Validators.required
    ])
  });

}
