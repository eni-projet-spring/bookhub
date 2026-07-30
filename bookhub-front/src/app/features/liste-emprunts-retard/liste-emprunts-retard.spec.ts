import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmpruntsRetard } from './liste-emprunts-retard';

describe('ListeEmpruntsRetard', () => {
  let component: ListeEmpruntsRetard;
  let fixture: ComponentFixture<ListeEmpruntsRetard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEmpruntsRetard],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeEmpruntsRetard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
