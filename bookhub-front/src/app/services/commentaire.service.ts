import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Contrat de l'API des avis du lecteur authentifié. */
export interface CommentaireResponse {
  idCommentaire: number;
  idLivre: number;
  isbn: string;
  titreLivre: string;
  auteurLivre: string;
  note: number;
  texte: string;
  datePublication: string;
}

@Injectable({ providedIn: 'root' })
export class CommentaireService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/commentaires';

  consulterMesCommentaires(): Observable<CommentaireResponse[]> {
    return this.http.get<CommentaireResponse[]>(`${this.apiUrl}/mes-commentaires`);
  }

  /** PUT assure la création ou la modification du même avis, sans duplication. */
  enregistrerAvis(isbn: string, note: number, texte: string): Observable<CommentaireResponse> {
    return this.http.put<CommentaireResponse>(
      `${this.apiUrl}/livre/${encodeURIComponent(isbn)}`,
      { note, texte },
    );
  }
}
