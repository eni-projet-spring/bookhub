import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Commentaire } from '../models/commentaire';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private readonly apiUrl = 'http://localhost:8080/api/commentaires';

  constructor(private http: HttpClient) {}

  getMesCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/moi`);
  }
}
