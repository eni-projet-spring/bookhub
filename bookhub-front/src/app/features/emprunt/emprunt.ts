import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { EmpruntResponse } from '../../models/emprunt-response';
import { Role } from '../../models/role';
import { EmpruntService } from '../../services/emprunt-service';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-emprunt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emprunt.html',
  styleUrl: './emprunt.css',
})
export class Emprunt implements OnInit {
  emprunts: EmpruntResponse[] = [];

  chargementEnCours = false;
  messageErreur = '';

  constructor(
    private empruntService: EmpruntService,
    private utilisateurService: UtilisateurService,
  ) {}

  ngOnInit(): void {
    this.chargerEmprunts();
  }

  chargerEmprunts(): void {
    this.chargementEnCours = true;
    this.messageErreur = '';

    const role = this.utilisateurService.getRole();

    if (role === Role.LIBRARIAN || role === Role.ADMIN) {
      this.chargerEmpruntsEnRetard();
      return;
    }

    if (role === Role.USER) {
      this.chargerMesEmprunts();
      return;
    }

    this.messageErreur = 'Vous devez être connecté pour consulter les emprunts.';
    this.chargementEnCours = false;
  }

  private chargerEmpruntsEnRetard(): void {
    this.empruntService.consulterEmpruntsEnRetard().subscribe({
      next: (emprunts) => {
        this.emprunts = emprunts;
        this.chargementEnCours = false;
      },
      error: () => {
        this.messageErreur = 'Impossible de charger les emprunts en retard.';
        this.chargementEnCours = false;
      },
    });
  }

  private chargerMesEmprunts(): void {
    this.empruntService.consulterMesEmprunts().subscribe({
      next: (emprunts) => {
        this.emprunts = emprunts;
        this.chargementEnCours = false;
      },
      error: () => {
        this.messageErreur = 'Impossible de charger vos emprunts.';
        this.chargementEnCours = false;
      },
    });
  }

  estBibliothecaire(): boolean {
    const role = this.utilisateurService.getRole();

    return role === Role.LIBRARIAN || role === Role.ADMIN;
  }

  estLecteur(): boolean {
    return this.utilisateurService.getRole() === Role.USER;
  }
}
