import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MonHistorique } from './mon-historique';
import { EmpruntService } from '../../services/emprunt-service';

describe('MonHistorique', () => {
  let fixture: ComponentFixture<MonHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonHistorique],
      providers: [
        provideRouter([]),
        { provide: EmpruntService, useValue: { consulterMesEmprunts: () => of([]) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MonHistorique);
    fixture.detectChanges();
  });

  it("n'invente aucun livre retourné", () => {
    expect(fixture.componentInstance.emprunts).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain("pas encore d'emprunt retourné");
  });
});
