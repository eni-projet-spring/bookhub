import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GestionProfil } from './gestion-profil';
import { ProfilService } from '../../services/profil.service';
import { UtilisateurService } from '../../services/utilisateur.service';

describe('GestionProfil', () => {
  const profil = { nom: 'Durand', prenom: 'Marc', email: 'bibliothecaire@bookhub.fr' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProfil],
      providers: [
        { provide: ProfilService, useValue: {
          getProfil: () => of(profil),
          editProfil: () => of(profil),
        } },
        { provide: UtilisateurService, useValue: {
          obtenirUtilisateurConnecte: () => null,
          mettreAJourIdentiteLocale: () => {},
        } },
      ],
    }).compileComponents();
  });

  it('affiche le profil sans exposer ni modifier un autre compte', () => {
    const fixture = TestBed.createComponent(GestionProfil);
    fixture.detectChanges();
    expect(fixture.componentInstance.formulaireProfil.controls.email.value)
      .toBe('bibliothecaire@bookhub.fr');
    expect(fixture.componentInstance.formulaireProfil.controls.email.disabled).toBe(true);
  });

  it('refuse deux mots de passe différents', () => {
    const fixture = TestBed.createComponent(GestionProfil);
    fixture.detectChanges();
    fixture.componentInstance.formulaireProfil.patchValue({
      motDePasse: 'nouveauSecret',
      confirmationMotDePasse: 'autreSecret',
    });
    fixture.componentInstance.enregistrer();
    expect(fixture.componentInstance.messageErreur).toContain('confirmation');
  });
});
