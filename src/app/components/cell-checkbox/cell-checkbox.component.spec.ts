import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCheckboxComponent } from './cell-checkbox.component';

describe('CellCheckboxComponent', () => {
  let component: CellCheckboxComponent;
  let fixture: ComponentFixture<CellCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
