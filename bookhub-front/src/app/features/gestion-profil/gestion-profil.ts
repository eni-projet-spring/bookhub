import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';
import { ProfilUtilisateurDTO } from '../../models/profil-utilisateur.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-profil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './gestion-profil.html',
  styleUrl: './gestion-profil.css',
})
export class GestionProfil implements OnInit {
  messageErreur = '';
  messageSucces = '';
  chargementEnCours = false;

  formulaireProfil = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.minLength(6)]),
  });

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    this.chargerProfil();
  }

  chargerProfil(): void {
    this.chargementEnCours = true;
    this.profilService.getProfil().subscribe({
      next: (profil) => {
        this.formulaireProfil.patchValue(profil);
        this.chargementEnCours = false;
      },
      error: () => {
        this.messageErreur = 'Impossible de charger le profil.';
        this.chargementEnCours = false;
      },
    });
  }

  enregistrer(): void {
    if (this.formulaireProfil.invalid) {
      this.formulaireProfil.markAllAsTouched();
      this.messageErreur = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.messageErreur = '';
    this.messageSucces = '';

    const valeurs = this.formulaireProfil.getRawValue();
    const dto: ProfilUtilisateurDTO = {
      nom: valeurs.nom!,
      prenom: valeurs.prenom!,
      email: valeurs.email!,
      motDePasse: valeurs.motDePasse ? valeurs.motDePasse : undefined,
    };

    this.profilService.editProfil(dto).subscribe({
      next: () => {
        this.messageSucces = 'Profil mis à jour avec succès.';
        this.formulaireProfil.patchValue({ motDePasse: '' });
      },
      error: () => {
        this.messageErreur = 'Une erreur est survenue lors de la mise à jour.';
      },
    });
  }

  supprimer(): void {
    if (!confirm('Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.')) {
      return;
    }

    this.profilService.deleteProfil().subscribe({
      next: () => {
        this.messageSucces = 'Profil supprimé.';
      },
      error: () => {
        this.messageErreur = 'Une erreur est survenue lors de la suppression.';
      },
    });
  }
}
