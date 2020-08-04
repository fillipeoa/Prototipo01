import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboracaoListComponent } from './colaboracao-list.component';

describe('ColaboracaoListComponent', () => {
  let component: ColaboracaoListComponent;
  let fixture: ComponentFixture<ColaboracaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboracaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboracaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
