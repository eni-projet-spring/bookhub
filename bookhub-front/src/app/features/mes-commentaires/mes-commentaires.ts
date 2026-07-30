import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Commentaire } from '../../models/commentaire';
import { CommentaireService } from '../../services/commentaire.service';

@Component({
  selector: 'app-mes-commentaires',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './mes-commentaires.html',
  styleUrl: './mes-commentaires.css',
})
export class MesCommentaires implements OnInit {
  commentaires: Commentaire[] = [];
  chargement = true;
  messageErreur = '';

  constructor(
    private commentaireService: CommentaireService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.chargerCommentaires();
  }

  chargerCommentaires(): void {
    this.chargement = true;
    this.messageErreur = '';

    this.commentaireService.getMesCommentaires().subscribe({
      next: (commentaires) => {
        console.log('Commentaires reçus :', commentaires);

        this.commentaires = commentaires ?? [];
        this.chargement = false;

        this.changeDetectorRef.detectChanges();
      },

      error: (erreur) => {
        console.error('Erreur de chargement des commentaires :', erreur);

        this.commentaires = [];
        this.chargement = false;
        this.messageErreur = 'Impossible de charger vos commentaires.';

        this.changeDetectorRef.detectChanges();
      },
    });
  }

  afficherEtoiles(note: number): string {
    const noteValide = Math.max(0, Math.min(Math.round(note ?? 0), 5));

    return '★'.repeat(noteValide) + '☆'.repeat(5 - noteValide);
  }

  modifierCommentaire(commentaire: Commentaire): void {
    console.log('Commentaire à modifier :', commentaire);
  }
}
