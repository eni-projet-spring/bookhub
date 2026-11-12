import { TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardLecteurAccueil } from './dashboard-lecteur-accueil';
import { EmpruntService } from '../../../services/emprunt-service';
import { ReservationService } from '../../../services/reservation.service';
import { LivreService } from '../../../services/livre';

// L'écran formate explicitement la date en français : le test enregistre la locale.
registerLocaleData(localeFr);

describe('DashboardLecteurAccueil', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLecteurAccueil],
      providers: [
        provideRouter([]),
        { provide: EmpruntService, useValue: { consulterMesEmprunts: () => of([]) } },
        { provide: ReservationService, useValue: { listerMesReservations: () => of([]) } },
        { provide: LivreService, useValue: { getAllBooks: () => of([]) } },
      ],
    }).compileComponents();
  });

  it('affiche un tableau de bord sans emprunts fictifs', () => {
    const fixture = TestBed.createComponent(DashboardLecteurAccueil);
    fixture.detectChanges();
    expect(fixture.componentInstance.empruntsEnCours.length).toBe(0);
    expect(fixture.componentInstance.reservationsActives.length).toBe(0);
    expect(fixture.nativeElement.querySelector('.reminders-card')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.stat-card').length).toBe(4);
    expect(fixture.nativeElement.textContent).toContain("Vous n'avez aucun emprunt en cours.");
  });
});
