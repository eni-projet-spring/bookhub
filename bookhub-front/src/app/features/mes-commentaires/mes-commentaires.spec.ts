import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MesCommentaires } from './mes-commentaires';
import { CommentaireService } from '../../services/commentaire.service';
import { EmpruntService } from '../../services/emprunt-service';

describe('MesCommentaires', () => {
  let fixture: ComponentFixture<MesCommentaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesCommentaires],
      providers: [
        provideRouter([]),
        { provide: EmpruntService, useValue: { consulterMesEmprunts: () => of([]) } },
        { provide: CommentaireService, useValue: { consulterMesCommentaires: () => of([]) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MesCommentaires);
    fixture.detectChanges();
  });

  it("n'affiche aucun avis fictif", () => {
    expect(fixture.componentInstance.commentaires).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('Aucun avis publié');
  });
});
