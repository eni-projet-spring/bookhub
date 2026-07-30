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

  // New properties for file handling
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  formulaireLivre = this.formBuilder.nonNullable.group({
    isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    titre: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(400)]],
    // 'couverture' is removed from the reactive form as it is now handled by the file input
    edition: ['', [Validators.required, Validators.maxLength(100)]],
    auteur: ['', [Validators.required, Validators.maxLength(100)]],
    idCategorie: [1, [Validators.required, Validators.min(1)]],
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Generate local preview using native FileReader
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  ajouterLivre(): void {
    this.messageSucces = '';
    this.messageErreur = '';

    if (this.formulaireLivre.invalid) {
      this.formulaireLivre.markAllAsTouched();
      return;
    }

    this.envoiEnCours = true;

    // 1. Build the FormData object
    const formData = new FormData();

    // Extract form values and append the JSON part for the backend DTO
    const livreData = {
      ...this.formulaireLivre.getRawValue(),
      couverture: '', // Send empty string, backend will override with the saved file path
    };

    // Append as a Blob with application/json type so Spring's @RequestPart can parse it
    formData.append('dto', new Blob([JSON.stringify(livreData)], { type: 'application/json' }));

    // Append the file if one was selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // 2. Call the new multipart service method
    this.livreService.ajouterLivreMultipart(formData).subscribe({
      next: (livre: LivreResponse) => {
        this.messageSucces = `Le livre « ${livre.titre} » a bien été ajouté.`;

        // Reset form (without 'couverture' since it's no longer in the form group)
        this.formulaireLivre.reset({
          isbn: '',
          titre: '',
          description: '',
          edition: '',
          auteur: '',
          idCategorie: 1,
        });

        // Reset file state
        this.selectedFile = null;
        this.previewUrl = null;
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
