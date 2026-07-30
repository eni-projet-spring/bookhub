import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getBookById(idLivre: number): Observable<LivreResponse> {
    return this.http.get<LivreResponse>(`${this.apiUrl}/${idLivre}`);
  }

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
  updateBook(idLivre: number, livre: LivreRequest): Observable<LivreResponse> {
    return this.http.put<LivreResponse>(`${this.apiUrl}/${idLivre}`, livre);
  }

  deleteBook(idLivre: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idLivre}`);
  }

  /**
   * Ajoute un livre avec sa couverture en tant que fichier (multipart/form-data).
   */
  ajouterLivreMultipart(formData: FormData): Observable<LivreResponse> {
    return this.http.post<LivreResponse>(this.apiUrl, formData);
  }
}
