import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bar1Component } from './bar1.component';

describe('Bar1Component', () => {
  let component: Bar1Component;
  let fixture: ComponentFixture<Bar1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bar1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Bar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
