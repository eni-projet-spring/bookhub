import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConnexionRequest } from '../models/connexion-request.model';
import { ConnexionResponse } from '../models/connexion-response.model';
import { UtilisateurResponse } from '../models/utilisateur-response.model';
import { InscriptionRequest } from '../models/inscription-request.model';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private readonly apiUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) {}

  login(connexionRequest: ConnexionRequest): Observable<ConnexionResponse> {
    return this.http.post<ConnexionResponse>(`${this.apiUrl}/login`, connexionRequest);
  }

  inscription(inscriptionRequest: InscriptionRequest): Observable<UtilisateurResponse> {
    return this.http.post<UtilisateurResponse>(`${this.apiUrl}/inscription`, inscriptionRequest);
  }

  enregistrerConnexion(connexionResponse: ConnexionResponse): void {
    const { token, ...utilisateur } = connexionResponse;

    localStorage.setItem('token', token);

    localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
  }

  obtenirToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenirUtilisateurConnecte(): UtilisateurResponse | null {
    const utilisateur = localStorage.getItem('utilisateurConnecte');

    if (!utilisateur) {
      return null;
    }

    return JSON.parse(utilisateur) as UtilisateurResponse;
  }

  getIdUtilisateurConnecte(): number | null {
    const utilisateur = this.obtenirUtilisateurConnecte();

    return utilisateur?.idUtilisateur ?? null;
  }

  deconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateurConnecte');
  }

  estConnecte(): boolean {
    return this.obtenirToken() !== null;
  }
}
