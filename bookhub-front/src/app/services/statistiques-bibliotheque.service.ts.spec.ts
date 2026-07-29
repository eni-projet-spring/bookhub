import { TestBed } from '@angular/core/testing';

import { StatistiquesBibliothequeServiceTs } from './statistiques-bibliotheque.service.ts';

describe('StatistiquesBibliothequeServiceTs', () => {
  let service: StatistiquesBibliothequeServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatistiquesBibliothequeServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
