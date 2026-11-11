import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardLecteurAccueil } from './dashboard-lecteur-accueil';
import { EmpruntService } from '../../../services/emprunt-service';
import { ReservationService } from '../../../services/reservation.service';
import { LivreService } from '../../../services/livre';

describe('DashboardLecteurAccueil', () => {
  let fixture: ComponentFixture<DashboardLecteurAccueil>;
  beforeEach(async () => {
    // Les API sont remplacées par des réponses contrôlées, sans serveur.
    await TestBed.configureTestingModule({
      imports: [DashboardLecteurAccueil],
      providers: [
        provideRouter([]),
        { provide: EmpruntService, useValue: { consulterMesEmprunts: () => of([]) } },
        { provide: ReservationService, useValue: { listerMesReservations: () => of([]) } },
        { provide: LivreService, useValue: { getAllBooks: () => of([]) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardLecteurAccueil);
    fixture.detectChanges();
  });

  it('affiche un tableau de bord sans emprunts fictifs', () => {
    expect(fixture.componentInstance.empruntsEnCours.length).toBe(0);
    expect(fixture.componentInstance.reservationsActives.length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain("aucun emprunt en cours");
  });
});
