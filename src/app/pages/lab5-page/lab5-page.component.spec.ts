import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab5PageComponent } from './lab5-page.component';

describe('Lab5PageComponent', () => {
  let component: Lab5PageComponent;
  let fixture: ComponentFixture<Lab5PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab5PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab5PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
