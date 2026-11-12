import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListeUtilisateurs } from './liste-utilisateurs';
import { UtilisateurService } from '../../services/utilisateur.service';

describe('ListeUtilisateurs', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeUtilisateurs],
      providers: [
        { provide: UtilisateurService, useValue: { listerUtilisateurs: () => of([]) } },
      ],
    }).compileComponents();
  });

  it('accepte une liste vide sans requête HTTP réelle', () => {
    const fixture = TestBed.createComponent(ListeUtilisateurs);
    fixture.detectChanges();
    expect(fixture.componentInstance.utilisateurs).toEqual([]);
    expect(fixture.componentInstance.messageErreur).toBe('');
  });
});
