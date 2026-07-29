import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// @ts-ignore
import { StatistiquesBibliotheque } from '../models/statistiques-bibliotheque.model';

@Injectable({
  providedIn: 'root',
})
export class StatistiquesBibliothequeService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/bibliothecaire/statistiques';

  consulterStatistiques(): Observable<StatistiquesBibliotheque> {
    return this.http.get<StatistiquesBibliotheque>(this.apiUrl);
  }
}
