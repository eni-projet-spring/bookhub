import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LivreRequest, LivreService } from '../../services/livre';

@Component({
  selector: 'app-modifier-livre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './modifier-livre.html',
  styleUrl: './modifier-livre.css',
})
export class ModifierLivre implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly livreService = inject(LivreService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  idLivre = 0;

  chargement = true;
  enregistrement = false;
  erreur = '';

  formulaire = this.formBuilder.nonNullable.group({
    isbn: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    titre: ['', [Validators.required, Validators.maxLength(255)]],
    auteur: ['', [Validators.required, Validators.maxLength(100)]],
    edition: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required]],
    couverture: ['', [Validators.required]],
    idCategorie: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.idLivre = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(this.idLivre) || this.idLivre <= 0) {
      this.erreur = 'Identifiant du livre invalide.';

      this.chargement = false;

      this.changeDetectorRef.detectChanges();

      return;
    }

    this.chargerLivre();
  }

  private chargerLivre(): void {
    this.chargement = true;
    this.erreur = '';

    this.livreService.getBookById(this.idLivre).subscribe({
      next: (livre) => {
        console.log('Livre reçu pour modification :', livre);

        this.formulaire.patchValue({
          isbn: livre.isbn ?? '',
          titre: livre.titre ?? '',
          auteur: livre.auteur ?? '',
          edition: livre.edition ?? '',
          description: livre.description ?? '',
          couverture: livre.couverture ?? '',
          idCategorie: livre.categorie?.idCategorie ?? livre.idCategorie ?? 0,
        });

        this.chargement = false;

        this.changeDetectorRef.detectChanges();
      },

      error: (error) => {
        console.error('Erreur lors du chargement du livre :', error);

        this.erreur = 'Impossible de charger le livre à modifier.';

        this.chargement = false;

        this.changeDetectorRef.detectChanges();
      },
    });
  }

  enregistrer(): void {
    if (this.formulaire.invalid || this.enregistrement) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.enregistrement = true;
    this.erreur = '';

    const request: LivreRequest = {
      ...this.formulaire.getRawValue(),
    };

    this.livreService.updateBook(this.idLivre, request).subscribe({
      next: (livre) => {
        this.router.navigate(['/livres', livre.idLivre ?? this.idLivre]);
      },

      error: (error) => {
        console.error('Erreur lors de la modification du livre :', error);

        this.erreur = 'La modification du livre a échoué.';

        this.enregistrement = false;

        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
