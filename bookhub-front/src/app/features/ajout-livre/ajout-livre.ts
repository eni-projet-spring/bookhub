import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LivreResponse, LivreService } from '../../services/livre';

@Component({
  selector: 'app-ajout-livre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajout-livre.html',
  styleUrl: './ajout-livre.css',
})
export class AjoutLivre {
  private readonly formBuilder = inject(FormBuilder);
  private readonly livreService = inject(LivreService);

  messageSucces = '';
  messageErreur = '';
  envoiEnCours = false;

  formulaireLivre = this.formBuilder.nonNullable.group({
    isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    titre: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(400)]],
    couverture: ['', [Validators.maxLength(255)]],
    edition: ['', [Validators.required, Validators.maxLength(100)]],
    auteur: ['', [Validators.required, Validators.maxLength(100)]],
    idCategorie: [1, [Validators.required, Validators.min(1)]],
  });

  ajouterLivre(): void {
    this.messageSucces = '';
    this.messageErreur = '';

    if (this.formulaireLivre.invalid) {
      this.formulaireLivre.markAllAsTouched();
      return;
    }

    this.envoiEnCours = true;

    this.livreService.ajouterLivre(this.formulaireLivre.getRawValue()).subscribe({
      next: (livre: LivreResponse) => {
        this.messageSucces = `Le livre « ${livre.titre} » a bien été ajouté.`;

        this.formulaireLivre.reset({
          isbn: '',
          titre: '',
          description: '',
          couverture: '',
          edition: '',
          auteur: '',
          idCategorie: 1,
        });

        this.envoiEnCours = false;
      },

      error: (erreur: HttpErrorResponse) => {
        console.error(erreur);

        this.messageErreur = erreur.error?.message ?? 'Impossible d’ajouter le livre.';

        this.envoiEnCours = false;
      },
    });
  }
}
