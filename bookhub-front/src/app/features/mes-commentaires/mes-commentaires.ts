import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentaireResponse, CommentaireService } from '../../services/commentaire.service';
import { EmpruntService } from '../../services/emprunt-service';
import { EmpruntResponse } from '../../models/emprunt-response';

/** Consultation et rédaction des avis sur les livres réellement retournés. */
@Component({
  selector: 'app-mes-commentaires',
  imports: [DatePipe, FormsModule],
  templateUrl: './mes-commentaires.html',
  styleUrl: './mes-commentaires.css',
})
export class MesCommentaires implements OnInit {
  private readonly commentairesService = inject(CommentaireService);
  private readonly empruntsService = inject(EmpruntService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  commentaires: CommentaireResponse[] = [];
  livresLus: EmpruntResponse[] = [];
  chargement = true;
  erreur = '';
  succes = '';
  enregistrementEnCours = false;

  // Un avis concerne un ISBN unique, non un exemplaire physique.
  isbn = '';
  note = 5;
  texte = '';

  ngOnInit(): void {
    const isbnDemande = this.route.snapshot.queryParamMap.get('isbn');
    this.empruntsService.consulterMesEmprunts().subscribe({
      next: (emprunts) => {
        const livres = emprunts.filter((emprunt) =>
          emprunt.statut === 'RETOURNE' || !!emprunt.dateRetour);
        // Chaque titre peut avoir été emprunté plusieurs fois : un seul choix par ISBN.
        this.livresLus = [...new Map(livres.map((livre) => [livre.isbn, livre])).values()];
        if (isbnDemande && this.livresLus.some((livre) => livre.isbn === isbnDemande)) {
          this.isbn = isbnDemande;
        }
        this.chargerCommentaires();
      },
      error: () => {
        this.erreur = 'Impossible de vérifier vos emprunts retournés.';
        this.chargement = false;
        this.cdr.markForCheck();
      },
    });
  }

  chargerCommentaires(): void {
    this.commentairesService.consulterMesCommentaires().subscribe({
      next: (commentaires) => {
        this.commentaires = commentaires;
        this.chargement = false;
        if (this.isbn) this.selectionnerLivre(this.isbn);
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Impossible de charger vos commentaires.';
        this.chargement = false;
        this.cdr.markForCheck();
      },
    });
  }

  selectionnerLivre(isbn: string): void {
    this.isbn = isbn;
    const avis = this.commentaires.find((commentaire) => commentaire.isbn === isbn);
    this.note = avis?.note ?? 5;
    this.texte = avis?.texte ?? '';
    this.succes = '';
    this.erreur = '';
  }

  enregistrerAvis(): void {
    if (!this.isbn || !this.texte.trim() || this.texte.trim().length > 1000 ||
        !Number.isInteger(this.note) || this.note < 1 || this.note > 5 ||
        this.enregistrementEnCours) return;

    this.enregistrementEnCours = true;
    this.erreur = '';
    this.succes = '';
    this.commentairesService.enregistrerAvis(this.isbn, this.note, this.texte.trim()).subscribe({
      next: () => {
        this.enregistrementEnCours = false;
        this.succes = 'Votre avis a été enregistré.';
        this.commentairesService.consulterMesCommentaires().subscribe({
          next: (commentaires) => {
            this.commentaires = commentaires;
            this.cdr.markForCheck();
          },
          error: () => {
            this.erreur = 'Avis enregistré, mais impossible de rafraîchir la liste.';
            this.cdr.markForCheck();
          },
        });
        this.cdr.markForCheck();
      },
      error: (e) => {
        this.enregistrementEnCours = false;
        this.erreur = e.status === 403
          ? 'Un livre doit être emprunté puis retourné avant de pouvoir être commenté.'
          : e.status === 401
            ? 'Votre session a expiré. Reconnectez-vous.'
            : 'Impossible d’enregistrer votre avis.';
        this.cdr.markForCheck();
      },
    });
  }
}
