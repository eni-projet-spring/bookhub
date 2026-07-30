import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLecteurAccueil } from './dashboard-lecteur-accueil';

describe('DashboardLecteurAccueil', () => {
  let component: DashboardLecteurAccueil;
  let fixture: ComponentFixture<DashboardLecteurAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLecteurAccueil],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLecteurAccueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
