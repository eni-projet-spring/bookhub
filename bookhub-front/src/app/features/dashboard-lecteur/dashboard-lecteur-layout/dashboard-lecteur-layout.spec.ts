import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLecteurLayout } from './dashboard-lecteur-layout';

describe('DashboardLecteurLayout', () => {
  let component: DashboardLecteurLayout;
  let fixture: ComponentFixture<DashboardLecteurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLecteurLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLecteurLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
