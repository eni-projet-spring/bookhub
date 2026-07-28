import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CategorieResponse {
  idCategorie: number;
  libelle: string;
}

export interface LivreResponse {
  idLivre: number;
  isbn: string;
  titre: string;
  auteur: string;
  edition: string;
  description: string;
  couverture: string;
  categorie?: CategorieResponse;
  idCategorie?: number;
  libelleCategorie?: string;
}

export interface LivreRequest {
  isbn: string;
  titre: string;
  auteur: string;
  edition: string;
  description: string;
  couverture: string;
  idCategorie: number;
}

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/livres';

  getAllBooks(): Observable<LivreResponse[]> {
    return this.http.get<LivreResponse[]>(this.apiUrl);
  }

  getBookById(idLivre: number): Observable<LivreResponse> {
    return this.http.get<LivreResponse>(`${this.apiUrl}/${idLivre}`);
  }

  ajouterLivre(livre: LivreRequest): Observable<LivreResponse> {
    return this.http.post<LivreResponse>(this.apiUrl, livre);
  }

  updateBook(idLivre: number, livre: LivreRequest): Observable<LivreResponse> {
    return this.http.put<LivreResponse>(`${this.apiUrl}/${idLivre}`, livre);
  }

  deleteBook(idLivre: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idLivre}`);
  }
}
