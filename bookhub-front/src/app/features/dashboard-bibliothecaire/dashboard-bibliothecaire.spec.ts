import { TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardBibliothecaire } from './dashboard-bibliothecaire';
import { StatistiquesBibliothequeService } from '../../services/statistiques-bibliotheque.service';

describe('DashboardBibliothecaire', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBibliothecaire],
      providers: [
        provideRouter([]),
        { provide: StatistiquesBibliothequeService, useValue: {
          consulterStatistiques: () => of({
            nombreEmpruntsEnCours: 3,
            nombreEmpruntsTotal: 6,
            nombreEmpruntsEnRetard: 1,
            nombreReservationsEnAttente: 1,
            livresPopulaires: [],
            empruntsEnRetard: [],
          }),
        } },
      ],
    }).compileComponents();
  });

  it('affiche les indicateurs reçus du service sans données fictives', () => {
    const fixture = TestBed.createComponent(DashboardBibliothecaire);
    fixture.detectChanges();
    expect(fixture.componentInstance.statistiques?.nombreEmpruntsTotal).toBe(6);
    expect(fixture.nativeElement.textContent).toContain('Réservations en attente');
  });
});
