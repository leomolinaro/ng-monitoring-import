import { HostsState } from './store/hosts.reducer';
import { Host, hostTypes } from './models/host';
import {Component} from '@angular/core';
import {GridOptions, CellValueChangedEvent} from 'ag-grid-community';
import {AgGridMaterialTextEditorComponent} from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import {AgGridMaterialSelectEditorComponent} from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import {AgGridMaterialCheckboxCellComponent} from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialTextareaEditorComponent } from './ag-grid-material-textarea-editor/ag-grid-material-textarea-editor.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromHosts from './store/hosts.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private gridOptions: GridOptions = <GridOptions>{
    enableSorting: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    rowHeight: 25,
    animateRows: true,
    onCellValueChanged: this.onCellValueChanged,
    deltaRowDataMode: true
  };
  public hosts$: Observable<Host[]>;
  private columnDefs: any[];
    
  onCellValueChanged(event: CellValueChangedEvent) {
    console.log("event", event);
  }

  constructor(private store: Store<HostsState>) {
    this.columnDefs = [
      { headerName: 'IP',   field: 'ip',          editable: true, pinned: 'left', cellEditorFramework: AgGridMaterialTextEditorComponent },
      { headerName: 'Name', field: 'name',        editable: true, pinned: 'left', cellEditorFramework: AgGridMaterialTextEditorComponent },
      { headerName: 'Type', field: 'type',        editable: true, pinned: 'left', cellEditorFramework: AgGridMaterialSelectEditorComponent, cellEditorParams: { values: hostTypes } },
      { headerName: 'Name', field: 'description', editable: true, pinned: null,   cellEditorFramework: AgGridMaterialTextEditorComponent },
      { headerName: 'Note', field: 'note',        editable: true, pinned: null,   cellEditorFramework: AgGridMaterialTextEditorComponent },
      { headerName: 'T1', field: 'template1',                                      cellRendererFramework: AgGridMaterialCheckboxCellComponent },
      { headerName: 'T2', field: 'template2',                               cellRendererFramework: AgGridMaterialCheckboxCellComponent },
      { headerName: 'T3', field: 'template3',                             cellRendererFramework: AgGridMaterialCheckboxCellComponent },
    ];

    this.hosts$ = this.store.select(fromHosts.selectHosts);
  }

  debug() {
    // console.log(this.store.value);
  }

}
