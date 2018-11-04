import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridMaterialTextareaEditorComponent } from './ag-grid-material-textarea-editor.component';

describe('AgGridMaterialTextareaEditorComponent', () => {
  let component: AgGridMaterialTextareaEditorComponent;
  let fixture: ComponentFixture<AgGridMaterialTextareaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridMaterialTextareaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridMaterialTextareaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
