import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfilUtilisateurDTO } from '../models/profil-utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private readonly apiUrl = 'http://localhost:8080/api/utilisateurs/profil';

  constructor(private http: HttpClient) {}

  getProfil(): Observable<ProfilUtilisateurDTO> {
    return this.http.get<ProfilUtilisateurDTO>(this.apiUrl);
  }

  editProfil(dto: ProfilUtilisateurDTO): Observable<ProfilUtilisateurDTO> {
    return this.http.put<ProfilUtilisateurDTO>(this.apiUrl, dto);
  }

  deleteProfil(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
