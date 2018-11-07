import { HostsState } from './store/hosts.reducer';
import { Host, hostTypes } from './models/host';
import {Component} from '@angular/core';
import {GridOptions, CellValueChangedEvent, ColDef, ValueSetterParams} from 'ag-grid-community';
import {AgGridMaterialTextEditorComponent} from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import {AgGridMaterialSelectEditorComponent} from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import {AgGridMaterialCheckboxCellComponent} from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialTextareaEditorComponent } from './ag-grid-material-textarea-editor/ag-grid-material-textarea-editor.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromHosts from './store/hosts.reducer';
import { AgGridColumn } from 'ag-grid-angular';
import { UpdateHost } from './store/hosts.actions';


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
    onCellValueChanged: (event: CellValueChangedEvent) => this.dispatchUpdate(event),
    deltaRowDataMode: true,
    getRowNodeId: row => row.id
  };
  public hosts$: Observable<Host[]>;
  private columnDefs: ColDef[];
  
  dispatchUpdate(event: CellValueChangedEvent) {
    const field = event.colDef.field;
    const value = event.newValue;
    const host: Host = event.data;
    const hostId = host.id;
    this.store.dispatch(new UpdateHost({ updates: { id: hostId, [field]: value } }));
    console.log("event", event);
  }

  hasChanged(params: ValueSetterParams): boolean {
    console.log(params)
    return params.oldValue != params.newValue;
  }

  constructor(private store: Store<HostsState>) {

    const stringColDef =      { cellEditorFramework: AgGridMaterialTextEditorComponent,     valueSetter: (params) => this.hasChanged(params) };
    const longStringColDef =  { cellEditorFramework: AgGridMaterialTextEditorComponent,     valueSetter: (params) => this.hasChanged(params) };
    const selectColDef =      { cellEditorFramework: AgGridMaterialSelectEditorComponent,   valueSetter: (params) => this.hasChanged(params) };
    const booleanColDef =     { cellRendererFramework: AgGridMaterialCheckboxCellComponent, valueSetter: (params) => this.hasChanged(params) };

    this.columnDefs = [
      { headerName: 'IP',           field: 'ip',          editable: true,   pinned: 'left', ...stringColDef },
      { headerName: 'Name',         field: 'name',        editable: true,   pinned: 'left', ...stringColDef },
      { headerName: 'Type',         field: 'type',        editable: true,   pinned: 'left', ...selectColDef, cellEditorParams: { values: hostTypes } },
      { headerName: 'Description',  field: 'description', editable: true,   pinned: null,   ...stringColDef },
      { headerName: 'Note',         field: 'note',        editable: true,   pinned: null,   ...longStringColDef },
      { headerName: 'T1',           field: 'template1',   editable: false,  pinned: null,   ...booleanColDef },
      { headerName: 'T2',           field: 'template2',   editable: false,  pinned: null,   ...booleanColDef },
      { headerName: 'T3',           field: 'template3',   editable: false,  pinned: null,   ...booleanColDef },
    ];

    this.hosts$ = this.store.select(fromHosts.selectHosts);
  }

  debug() {
    // console.log(this.store.value);
  }

}
