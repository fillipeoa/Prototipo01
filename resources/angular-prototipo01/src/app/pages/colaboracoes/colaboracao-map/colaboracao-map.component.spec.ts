import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboracaoMapComponent } from './colaboracao-map.component';

describe('ColaboracaoMapComponent', () => {
  let component: ColaboracaoMapComponent;
  let fixture: ComponentFixture<ColaboracaoMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboracaoMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboracaoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
