import { HostsState } from './store/hosts.reducer';
import { Host, hostTypes } from './models/host';
import {Component} from '@angular/core';
import {GridOptions, ColDef, ValueSetterParams} from 'ag-grid-community';
import {AgGridMaterialTextEditorComponent} from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import {AgGridMaterialSelectEditorComponent} from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import {AgGridMaterialCheckboxCellComponent} from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { Observable } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromHosts from './store/hosts.reducer';
import { UpdateHost } from './store/hosts.actions';

const gridOptions: GridOptions = {
  enableSorting: true,
  rowSelection: 'multiple',
  suppressRowClickSelection: true,
  rowHeight: 25,
  animateRows: true,
  // onCellValueChanged: (event: CellValueChangedEvent) => this.dispatchUpdate(event),
  deltaRowDataMode: true,
  getRowNodeId: row => row.id
};
const colDefString: ColDef =      { cellEditorFramework: AgGridMaterialTextEditorComponent,     valueSetter: (params) => this.valueSetter(params) };
const colDefLongString: ColDef =  { cellEditorFramework: AgGridMaterialTextEditorComponent,     valueSetter: (params) => this.valueSetter(params) };
const colDefSelect: ColDef =      { cellEditorFramework: AgGridMaterialSelectEditorComponent,   valueSetter: (params) => this.valueSetter(params) };
const colDefBoolean: ColDef =     { cellRendererFramework: AgGridMaterialCheckboxCellComponent, valueSetter: (params) => this.valueSetter(params) };

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

  gridOptionsAll = { ... gridOptions };
  gridOptionsT1 = { ... gridOptions };
  rowsAll$: Observable<Host[]>;
  rowsT1$: Observable<Host[]>;
  colDefsAll: ColDef[];
  colDefsT1: ColDef[];
  
  valueSetter(params: ValueSetterParams): boolean {
    const field = params.colDef.field;
    const value = params.newValue;
    const host: Host = params.data;
    const hostId = host.id;
    this.store.dispatch(new UpdateHost({ updates: { id: hostId, [field]: value } }));
    return params.oldValue != params.newValue;
  }

  constructor(private store: Store<HostsState>) {
    this.colDefsAll = [
      { headerName: 'IP',           field: 'ip',          editable: true,   pinned: 'left', ...colDefString },
      { headerName: 'Name',         field: 'name',        editable: true,   pinned: 'left', ...colDefString },
      { headerName: 'Type',         field: 'type',        editable: true,   pinned: 'left', ...colDefSelect, cellEditorParams: { values: hostTypes } },
      { headerName: 'Description',  field: 'description', editable: true,   pinned: null,   ...colDefString },
      { headerName: 'Note',         field: 'note',        editable: true,   pinned: null,   ...colDefLongString },
      { headerName: 'T1',           field: 'template1',   editable: false,  pinned: null,   ...colDefBoolean },
      { headerName: 'T2',           field: 'template2',   editable: false,  pinned: null,   ...colDefBoolean },
      { headerName: 'T3',           field: 'template3',   editable: false,  pinned: null,   ...colDefBoolean },
    ];
    this.colDefsT1 = [
      { headerName: 'IP',           field: 'ip',          editable: true,   pinned: 'left', ...colDefString },
      { headerName: 'Name',         field: 'name',        editable: true,   pinned: 'left', ...colDefString },
      { headerName: 'Type',         field: 'type',        editable: true,   pinned: 'left', ...colDefSelect, cellEditorParams: { values: hostTypes } }
    ];
    this.rowsAll$ = this.store.select(fromHosts.selectHosts);
    this.rowsT1$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.template1)));
  }

  debug() {
    this.store.select(fromHosts.selectHosts).pipe(take(1))
    .subscribe(console.log);
  }

}
