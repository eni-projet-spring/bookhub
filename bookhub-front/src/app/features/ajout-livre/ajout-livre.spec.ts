import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AjoutLivre } from './ajout-livre';
import { LivreService } from '../../services/livre';

describe('AjoutLivre', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutLivre],
      providers: [
        { provide: LivreService, useValue: {
          getCategories: () => of([{ idCategorie: 8, libelle: 'Histoire' }]),
        } },
      ],
    }).compileComponents();
  });

  it('charge les catégories réelles et ne présélectionne pas un identifiant arbitraire', () => {
    const fixture = TestBed.createComponent(AjoutLivre);
    fixture.detectChanges();
    expect(fixture.componentInstance.categories.length).toBe(1);
    expect(fixture.componentInstance.categories[0].idCategorie).toBe(8);
    expect(fixture.componentInstance.formulaireLivre.controls.idCategorie.value).toBe(0);
  });
});
