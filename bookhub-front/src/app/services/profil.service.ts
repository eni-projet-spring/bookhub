import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD

=======
>>>>>>> cd963af1663a3f87033bfb7976b9491e32b9e8cb
import { ProfilUtilisateurDTO } from '../models/profil-utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
<<<<<<< HEAD
  private readonly apiUrl = 'http://localhost:8080/api/utilisateurs/profil';
=======
  private readonly apiUrl = 'http://localhost:8080/api/profil';
>>>>>>> cd963af1663a3f87033bfb7976b9491e32b9e8cb

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
