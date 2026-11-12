import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardLecteurLayout } from './dashboard-lecteur-layout';

describe('DashboardLecteurLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLecteurLayout],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('affiche le menu interne sans dépendre d’une route réelle', () => {
    const fixture = TestBed.createComponent(DashboardLecteurLayout);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Mes emprunts');
  });
});
