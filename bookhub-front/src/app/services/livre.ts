import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllBooks(searchTerm?: string): Observable<LivreResponse[]> {
    // Create a new, strictly typed HttpParams object
    let params = new HttpParams();

    // If a search term exists, append it to the params
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    // Now TypeScript knows exactly what 'params' is, and the red errors will vanish
    return this.http.get<LivreResponse[]>(this.apiUrl, { params });
  }
}
