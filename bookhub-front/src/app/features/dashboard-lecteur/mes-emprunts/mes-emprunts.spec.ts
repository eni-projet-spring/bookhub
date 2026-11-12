import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MesEmprunts } from './mes-emprunts';
import { EmpruntService } from '../../../services/emprunt-service';
import { EmpruntResponse } from '../../../models/emprunt-response';

registerLocaleData(localeFr);

describe('MesEmprunts', () => {
  const emprunts: EmpruntResponse[] = [
    {
      idEmprunt: 1,
      nomUtilisateur: 'Utilisateur',
      prenomUtilisateur: 'Test',
      titreLivre: "L'Étranger",
      isbn: '9782070360024',
      dateDebut: '2026-11-06T10:00:00',
      dateFinPrevue: '2026-11-21T10:00:00',
      dateRetour: null,
      statut: 'EN_COURS',
      nombreJoursRetard: 0,
      auteurLivre: 'Albert Camus',
      couvertureLivre: '/couvertures/exemple.jpg',
    },
    {
      idEmprunt: 2,
      nomUtilisateur: 'Utilisateur',
      prenomUtilisateur: 'Test',
      titreLivre: '1984',
      isbn: '9782070368228',
      dateDebut: '2026-11-06T10:00:00',
      dateFinPrevue: '2026-11-21T10:00:00',
      dateRetour: null,
      statut: 'EN_COURS',
      nombreJoursRetard: 0,
      auteurLivre: 'George Orwell',
      couvertureLivre: '/couvertures/autre.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesEmprunts],
      providers: [
        { provide: EmpruntService, useValue: {
          consulterMesEmprunts: () => of(emprunts),
        } },
      ],
    }).compileComponents();
  });

  it('affiche toutes les données des prêts avec des dates françaises et des jaquettes', () => {
    const fixture = TestBed.createComponent(MesEmprunts);
    fixture.detectChanges();
    const contenu = fixture.nativeElement.textContent as string;
    expect(fixture.componentInstance.empruntsEnCours.length).toBe(2);
    expect(contenu).toContain("L'Étranger");
    expect(contenu).toContain('1984');
    expect(contenu).toContain('Albert Camus');
    expect(contenu).toContain('George Orwell');
    expect(contenu).toContain('novembre 2026');
    expect(fixture.nativeElement.querySelectorAll('.loan-card__cover-image').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.loan-card__details dd').length).toBe(4);
  });
});
