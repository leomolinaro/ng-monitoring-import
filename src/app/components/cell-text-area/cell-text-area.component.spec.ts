import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTextAreaComponent } from './cell-text-area.component';

describe('CellTextAreaComponent', () => {
  let component: CellTextAreaComponent;
  let fixture: ComponentFixture<CellTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellTextAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
