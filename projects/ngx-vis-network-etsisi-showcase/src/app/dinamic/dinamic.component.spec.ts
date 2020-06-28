import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicComponent } from './dinamic.component';

describe('DinamicComponent', () => {
  let component: DinamicComponent;
  let fixture: ComponentFixture<DinamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DinamicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
