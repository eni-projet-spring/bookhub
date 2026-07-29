import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emprunt } from './emprunt';

describe('Emprunt', () => {
  let component: Emprunt;
  let fixture: ComponentFixture<Emprunt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emprunt],
    }).compileComponents();

    fixture = TestBed.createComponent(Emprunt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
