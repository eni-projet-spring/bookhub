import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilService } from './profil.service';
import { ProfilUtilisateurDTO } from '../models/profil-utilisateur.model';

@Component({
  selector: 'app-gestion-profil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    this.chargerProfil();
  }

  chargerProfil(): void {
    this.chargementEnCours = true;
    this.profilService.getProfil().subscribe({
      next: (profil) => {
        // patchValue met à jour le formulaire sans avoir besoin de tous les champs
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

    const dto = this.formulaireProfil.value as ProfilUtilisateurDTO;

    this.profilService.editProfil(dto).subscribe({
      next: () => {
        this.messageSucces = 'Profil mis à jour avec succès.';
      },
      error: () => {
        this.messageErreur = 'Une erreur est survenue lors de la mise à jour.';
      },
    });
  }

  supprimer(): void {
    this.profilService.deleteProfil().subscribe({
      next: () => {
        this.messageSucces = 'Profil supprimé.';
        // ici on redirigera normalement vers la page de connexion
      },
      error: () => {
        this.messageErreur = 'Une erreur est survenue lors de la suppression.';
      },
    });
  }
}
