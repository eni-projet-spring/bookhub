import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardBibliothecaire } from './dashboard-bibliothecaire';

describe('DashboardBibliothecaire', () => {
  let component: DashboardBibliothecaire;
  let fixture: ComponentFixture<DashboardBibliothecaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBibliothecaire],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBibliothecaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
