import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroArticulosComponent } from './registro-articulos.component';

describe('RegistroArticulosComponent', () => {
  let component: RegistroArticulosComponent;
  let fixture: ComponentFixture<RegistroArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
