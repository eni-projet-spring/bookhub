import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReservationResponse } from '../models/reservation-response';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  reserverLivre(idLivre: number): Observable<ReservationResponse> {
    const params = new HttpParams().set('idLivre', idLivre.toString());

    return this.http.post<ReservationResponse>(this.apiUrl, null, {
      params,
    });
  }

  listerReservationsEnAttente(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/en-attente`);
  }

  listerMesReservations(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/mes-reservations`);
  }

  annulerReservation(idReservation: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idReservation}`);
  }

  confirmerReservation(idReservation: number): Observable<ReservationResponse> {
    return this.http.patch<ReservationResponse>(`${this.apiUrl}/${idReservation}/confirmer`, null);
  }

  rejeterReservation(idReservation: number): Observable<ReservationResponse> {
    return this.http.patch<ReservationResponse>(`${this.apiUrl}/${idReservation}/rejeter`, null);
  }
}
