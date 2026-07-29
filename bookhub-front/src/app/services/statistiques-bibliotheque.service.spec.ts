import { TestBed } from '@angular/core/testing';

import { StatistiquesBibliothequeService } from './statistiques-bibliotheque.service';

describe('StatistiquesBibliothequeService', () => {
  let service: StatistiquesBibliothequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatistiquesBibliothequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
