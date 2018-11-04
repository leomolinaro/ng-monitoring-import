import { AppState } from './store/app.reducer';
import { Host } from './models/host';
import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import {AgGridMaterialTextEditorComponent} from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import {AgGridMaterialSelectEditorComponent} from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import {AgGridMaterialCheckboxCellComponent} from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialTextareaEditorComponent } from './ag-grid-material-textarea-editor/ag-grid-material-textarea-editor.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private gridOptions: GridOptions = <GridOptions>{
    enableSorting: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true
  };
  public hosts$: Observable<Host[]>;
  private columnDefs: any[];

  constructor(private store: Store<AppState>) {
    this.columnDefs = [
      {
        headerName: 'IP',
        field: 'ip',
        editable: true,
        cellEditorFramework: AgGridMaterialTextEditorComponent,
        pinned: 'left'
      },
      {
        headerName: 'Name',
        field: 'name',
        editable: true,
        cellEditorFramework: AgGridMaterialTextEditorComponent,
        pinned: 'left'
      },
      {
        headerName: 'Type',
        field: 'type',
        editable: true,
        cellEditorFramework: AgGridMaterialSelectEditorComponent,
        pinned: 'left',
        cellEditorParams: { values: ['AP', 'Router', 'Switch', 'TVCC', 'Server', 'WiFi Controller', 'Bridge Radio', 'UPS', 'Sensor', 'PABX', 'Firewall'] }
      },
      {
        headerName: 'Description',
        field: 'description',
        editable: true,
        cellEditorFramework: AgGridMaterialTextEditorComponent
      },
      {
        headerName: 'Note',
        field: 'note',
        editable: true,
        cellEditorFramework: AgGridMaterialTextareaEditorComponent
      },
      {
        headerName: 'Basic',
        field: 'basic',
        cellRendererFramework: AgGridMaterialCheckboxCellComponent,
        // width: 80
      },
      { headerName: 'Net basic', field: 'netBasic', cellRendererFramework: AgGridMaterialCheckboxCellComponent },
      { headerName: 'Net medium', field: 'netMedium', cellRendererFramework: AgGridMaterialCheckboxCellComponent },
      { headerName: 'Net interfaces', field: 'netInterfaces', cellRendererFramework: AgGridMaterialCheckboxCellComponent },
      { headerName: 'STP', field: 'stp', cellRendererFramework: AgGridMaterialCheckboxCellComponent }
    ];

    this.hosts$ = this.store.select(fromApp.selectHostList);
  }

  debug() {
    console.log(this.store.value);
  }

}
