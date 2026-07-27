import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConnexionRequest } from '../models/connexion-request.model';
import { UtilisateurResponse } from '../models/utilisateur-response.model';
import { InscriptionRequest } from '../models/inscription-request.model';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private readonly apiUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) {}

  login(connexionRequest: ConnexionRequest): Observable<UtilisateurResponse> {
    return this.http.post<UtilisateurResponse>(`${this.apiUrl}/login`, connexionRequest);
  }

  inscription(inscriptionRequest: InscriptionRequest): Observable<UtilisateurResponse> {
    return this.http.post<UtilisateurResponse>(`${this.apiUrl}/inscription`, inscriptionRequest);
  }
}
