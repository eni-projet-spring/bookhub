import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReservations } from './dashboard-reservations';

describe('DashboardReservations', () => {
  let component: DashboardReservations;
  let fixture: ComponentFixture<DashboardReservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReservations],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardReservations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
