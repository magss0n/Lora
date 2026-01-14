import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cooperatives } from './cooperatives';

describe('Cooperatives', () => {
  let component: Cooperatives;
  let fixture: ComponentFixture<Cooperatives>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cooperatives]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cooperatives);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
