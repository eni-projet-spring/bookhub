import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LivreRequest {
  isbn: string;
  titre: string;
  description: string;
  couverture: string;
  edition: string;
  auteur: string;
  idCategorie: number;
}

export interface LivreResponse {
  idLivre: number;
  isbn: string;
  titre: string;
  description: string;
  couverture: string;
  edition: string;
  auteur: string;
  idCategorie: number;
  libelleCategorie: string;
}

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/livres';

  ajouterLivre(livre: LivreRequest): Observable<LivreResponse> {
    return this.http.post<LivreResponse>(this.apiUrl, livre);
  }
}
