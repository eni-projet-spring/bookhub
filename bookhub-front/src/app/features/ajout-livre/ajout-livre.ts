import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieResponse, LivreResponse, LivreService } from '../../services/livre';

/** Formulaire partagé par le bibliothécaire et l'administrateur. */
@Component({
  selector: 'app-ajout-livre',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajout-livre.html',
  styleUrl: './ajout-livre.css',
})
export class AjoutLivre implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly livreService = inject(LivreService);
  private readonly cdr = inject(ChangeDetectorRef);

  categories: CategorieResponse[] = [];
  chargementCategories = false;
  messageSucces = '';
  messageErreur = '';
  envoiEnCours = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  formulaireLivre = this.formBuilder.nonNullable.group({
    isbn: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    titre: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(400)]],
    edition: ['', [Validators.required, Validators.maxLength(100)]],
    auteur: ['', [Validators.required, Validators.maxLength(100)]],
    idCategorie: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.chargementCategories = true;
    this.livreService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.chargementCategories = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageErreur = 'Impossible de récupérer les catégories du catalogue.';
        this.chargementCategories = false;
        this.cdr.markForCheck();
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fichier = input.files?.[0] ?? null;
    this.messageErreur = '';
    this.selectedFile = null;
    this.previewUrl = null;
    if (!fichier) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(fichier.type)) {
      this.messageErreur = 'La couverture doit être une image JPEG, PNG ou WebP.';
      input.value = '';
      return;
    }
    if (fichier.size > 3 * 1024 * 1024) {
      this.messageErreur = 'La couverture ne doit pas dépasser 3 Mo.';
      input.value = '';
      return;
    }
    this.selectedFile = fichier;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(fichier);
  }

  ajouterLivre(): void {
    this.messageSucces = '';
    this.messageErreur = '';
    if (this.formulaireLivre.invalid || !this.categories.some(c => c.idCategorie === this.formulaireLivre.controls.idCategorie.value)) {
      this.formulaireLivre.markAllAsTouched();
      this.messageErreur = 'Veuillez compléter les champs et sélectionner une catégorie valide.';
      return;
    }
    if (this.envoiEnCours) return;
    this.envoiEnCours = true;
    const formData = new FormData();
    const livreData = { ...this.formulaireLivre.getRawValue(), couverture: '' };
    formData.append('dto', new Blob([JSON.stringify(livreData)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.livreService.ajouterLivreMultipart(formData).subscribe({
      next: (livre: LivreResponse) => {
        this.messageSucces = `Le livre « ${livre.titre} » a été ajouté au catalogue.`;
        this.formulaireLivre.reset({
          isbn: '', titre: '', description: '', edition: '', auteur: '', idCategorie: 0,
        });
        this.selectedFile = null;
        this.previewUrl = null;
        this.envoiEnCours = false;
        this.cdr.markForCheck();
      },
      error: (erreur: HttpErrorResponse) => {
        this.messageErreur = erreur.error?.message ?? "Impossible d'ajouter le livre.";
        this.envoiEnCours = false;
        this.cdr.markForCheck();
      },
    });
  }
}
