import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab1PageComponent } from './lab1-page.component';

describe('Lab1PageComponent', () => {
  let component: Lab1PageComponent;
  let fixture: ComponentFixture<Lab1PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab1PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
