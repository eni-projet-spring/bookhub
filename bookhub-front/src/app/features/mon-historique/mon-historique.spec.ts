import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonHistorique } from './mon-historique';

describe('MonHistorique', () => {
  let component: MonHistorique;
  let fixture: ComponentFixture<MonHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonHistorique],
    }).compileComponents();

    fixture = TestBed.createComponent(MonHistorique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
