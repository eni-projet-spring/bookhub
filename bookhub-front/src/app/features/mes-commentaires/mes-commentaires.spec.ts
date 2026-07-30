import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCommentaires } from './mes-commentaires';

describe('MesCommentaires', () => {
  let component: MesCommentaires;
  let fixture: ComponentFixture<MesCommentaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesCommentaires],
    }).compileComponents();

    fixture = TestBed.createComponent(MesCommentaires);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
