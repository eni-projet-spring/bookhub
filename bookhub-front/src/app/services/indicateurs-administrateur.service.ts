import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LivreReserve {
  titre: string;
  nombreReservations: number;
}

export interface CategorieAppreciee {
  categorie: string;
  noteMoyenne: number;
  nombreAvis: number;
}

export interface IndicateursAdministrateur {
  livresLesPlusReserves: LivreReserve[];
  categoriesLesMieuxNotees: CategorieAppreciee[];
}

/** Agrégations calculées par Spring Boot, accessibles uniquement à ADMIN. */
@Injectable({ providedIn: 'root' })
export class IndicateursAdministrateurService {
  private readonly http = inject(HttpClient);

  consulter(): Observable<IndicateursAdministrateur> {
    return this.http.get<IndicateursAdministrateur>('http://localhost:8080/api/admin/indicateurs');
  }
}
