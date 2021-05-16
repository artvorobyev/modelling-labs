import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab2PageComponent } from './lab2-page.component';

describe('Lab2PageComponent', () => {
  let component: Lab2PageComponent;
  let fixture: ComponentFixture<Lab2PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab2PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
