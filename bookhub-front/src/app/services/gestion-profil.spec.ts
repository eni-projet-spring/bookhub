import { TestBed } from '@angular/core/testing';

import { GestionProfil } from './gestion-profil';

describe('GestionProfil', () => {
  let service: GestionProfil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionProfil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
