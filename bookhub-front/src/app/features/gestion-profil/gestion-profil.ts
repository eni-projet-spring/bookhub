import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { ProfilUtilisateurDTO } from '../../models/profil-utilisateur.model';

/** Écran partagé entre les trois rôles, intégré dans leur layout respectif. */
@Component({
  selector: 'app-gestion-profil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestion-profil.html',
  styleUrl: './gestion-profil.css',
})
export class GestionProfil implements OnInit {
  private readonly profilService = inject(ProfilService);
  private readonly utilisateurService = inject(UtilisateurService);
  private readonly cdr = inject(ChangeDetectorRef);
  messageErreur = '';
  messageSucces = '';
  chargementEnCours = false;
  enregistrementEnCours = false;

  formulaireProfil = new FormGroup({
    nom: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
    prenom: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
    email: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    motDePasse: new FormControl('', { nonNullable: true, validators: [Validators.minLength(6)] }),
    confirmationMotDePasse: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void { this.chargerProfil(); }

  chargerProfil(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';
    this.profilService.getProfil().subscribe({
      next: profil => {
        this.formulaireProfil.patchValue({
          nom: profil.nom, prenom: profil.prenom, email: profil.email,
          motDePasse: '', confirmationMotDePasse: '',
        });
        this.chargementEnCours = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageErreur = 'Impossible de charger votre profil.';
        this.chargementEnCours = false;
        this.cdr.markForCheck();
      },
    });
  }

  enregistrer(): void {
    if (this.formulaireProfil.invalid) {
      this.formulaireProfil.markAllAsTouched();
      this.messageErreur = 'Veuillez corriger les champs du formulaire.';
      return;
    }
    const valeurs = this.formulaireProfil.getRawValue();
    if (valeurs.motDePasse !== valeurs.confirmationMotDePasse) {
      this.messageErreur = 'La confirmation du mot de passe ne correspond pas.';
      return;
    }
    const dto: ProfilUtilisateurDTO = {
      nom: valeurs.nom.trim(),
      prenom: valeurs.prenom.trim(),
      email: valeurs.email,
      motDePasse: valeurs.motDePasse || undefined,
    };
    if (!dto.nom || !dto.prenom) {
      this.messageErreur = 'Le nom et le prénom sont obligatoires.';
      return;
    }
    this.enregistrementEnCours = true;
    this.messageErreur = '';
    this.messageSucces = '';
    this.profilService.editProfil(dto).subscribe({
      next: profil => {
        this.enregistrementEnCours = false;
        this.formulaireProfil.patchValue({ motDePasse: '', confirmationMotDePasse: '' });
        // Conserver un affichage du nom à jour dans l'en-tête.
        const utilisateur = this.utilisateurService.obtenirUtilisateurConnecte();
        if (utilisateur) {
          this.utilisateurService.mettreAJourIdentiteLocale(profil.nom, profil.prenom);
        }
        this.messageSucces = 'Votre profil a été mis à jour.';
        this.cdr.markForCheck();
      },
      error: () => {
        this.enregistrementEnCours = false;
        this.messageErreur = 'La modification du profil a échoué.';
        this.cdr.markForCheck();
      },
    });
  }
}
