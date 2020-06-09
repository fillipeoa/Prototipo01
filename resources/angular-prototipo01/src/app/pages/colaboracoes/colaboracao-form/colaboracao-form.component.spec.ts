import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboracaoFormComponent } from './colaboracao-form.component';

describe('ColaboracaoFormComponent', () => {
  let component: ColaboracaoFormComponent;
  let fixture: ComponentFixture<ColaboracaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboracaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboracaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
