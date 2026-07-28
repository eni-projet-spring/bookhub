import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpruntResponse } from '../models/emprunt-response';

@Injectable({
  providedIn: 'root',
})
export class EmpruntService {
  private readonly apiUrl = 'http://localhost:8080/api/emprunts';

  constructor(private http: HttpClient) {}

  consulterEmpruntsEnRetard(): Observable<EmpruntResponse[]> {
    return this.http.get<EmpruntResponse[]>(`${this.apiUrl}/retards`);
  }

  consulterMesEmprunts(): Observable<EmpruntResponse[]> {
    return this.http.get<EmpruntResponse[]>(`${this.apiUrl}/mes-emprunts`);
  }
}
