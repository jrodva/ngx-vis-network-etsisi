import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVisNetworkEtsisiComponent } from './ngx-vis-network-etsisi.component';

describe('NgxVisNetworkEtsisiComponent', () => {
  let component: NgxVisNetworkEtsisiComponent;
  let fixture: ComponentFixture<NgxVisNetworkEtsisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxVisNetworkEtsisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVisNetworkEtsisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
