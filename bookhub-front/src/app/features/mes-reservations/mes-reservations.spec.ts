import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MesReservations } from './mes-reservations';
import { ReservationService } from '../../services/reservation.service';

describe('MesReservations', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesReservations],
      providers: [
        { provide: ReservationService, useValue: {
          listerMesReservations: () => of([]),
        } },
      ],
    }).compileComponents();
  });

  it('affiche un état vide sans solliciter le backend réel', () => {
    const fixture = TestBed.createComponent(MesReservations);
    fixture.detectChanges();
    expect(fixture.componentInstance.mesReservations).toEqual([]);
    expect(fixture.componentInstance.messageErreur).toBe('');
  });
});
