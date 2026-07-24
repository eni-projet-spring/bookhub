import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutLivre } from './ajout-livre';

describe('AjoutLivre', () => {
  let component: AjoutLivre;
  let fixture: ComponentFixture<AjoutLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutLivre],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutLivre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
