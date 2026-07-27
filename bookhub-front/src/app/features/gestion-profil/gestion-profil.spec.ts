import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfil } from './gestion-profil';

describe('GestionProfil', () => {
  let component: GestionProfil;
  let fixture: ComponentFixture<GestionProfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProfil],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionProfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
