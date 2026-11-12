import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListeEmpruntsRetard } from './liste-emprunts-retard';
import { EmpruntService } from '../../services/emprunt-service';

describe('ListeEmpruntsRetard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEmpruntsRetard],
      providers: [
        { provide: EmpruntService, useValue: { consulterEmpruntsEnRetard: () => of([]) } },
      ],
    }).compileComponents();
  });

  it('affiche une liste vide sans joindre le serveur', () => {
    const fixture = TestBed.createComponent(ListeEmpruntsRetard);
    fixture.detectChanges();
    expect(fixture.componentInstance.empruntsEnRetard).toEqual([]);
    expect(fixture.componentInstance.messageErreur).toBe('');
  });
});
