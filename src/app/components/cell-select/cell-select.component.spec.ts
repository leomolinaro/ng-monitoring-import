import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellSelectComponent } from './cell-select.component';

describe('CellSelectComponent', () => {
  let component: CellSelectComponent;
  let fixture: ComponentFixture<CellSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
