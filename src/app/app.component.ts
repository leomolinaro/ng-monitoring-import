import { HostsState } from './store/hosts.reducer';
import { Host, hostTypes } from './models/host';
import {Component} from '@angular/core';
import {GridOptions, ColDef, ValueSetterParams, ICellRendererParams, ColGroupDef} from 'ag-grid-community';
import {AgGridMaterialTextEditorComponent} from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import {AgGridMaterialSelectEditorComponent} from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import {AgGridMaterialCheckboxCellComponent} from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { Observable } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromHosts from './store/hosts.reducer';
import { UpdateHost } from './store/hosts.actions';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly gridOptions: GridOptions = {
    enableSorting: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    rowHeight: 25,
    animateRows: true,
    // onCellValueChanged: (event: CellValueChangedEvent) => this.dispatchUpdate(event),
    deltaRowDataMode: true,
    context: { onCheckboxChange: (checked: boolean, params: ICellRendererParams) => this.onCheckboxChange(checked, params) },
    getRowNodeId: row => row.id
  };

  private readonly colDefString: ColDef =      { cellEditorFramework: AgGridMaterialTextEditorComponent,     valueSetter: (params) => this.valueSetter(params) };
  private readonly colDefLongString: ColDef =  { cellEditorFramework: AgGridMaterialTextEditorComponent,     valueSetter: (params) => this.valueSetter(params) };
  private readonly colDefSelect: ColDef =      { cellEditorFramework: AgGridMaterialSelectEditorComponent,   valueSetter: (params) => this.valueSetter(params) };
  private readonly colDefBoolean: ColDef =     { cellRendererFramework: AgGridMaterialCheckboxCellComponent, width: 80 };

  gridOptionsAll = { ...this.gridOptions };
  gridOptionsT1 = { ...this.gridOptions };
  gridOptionsT2 = { ...this.gridOptions };
  gridOptionsT3 = { ...this.gridOptions };
  rowsAll$: Observable<Host[]>;
  rowsT1$: Observable<Host[]>;
  rowsT2$: Observable<Host[]>;
  rowsT3$: Observable<Host[]>;
  colDefsAll: (ColDef | ColGroupDef)[];
  colDefsT1: (ColDef | ColGroupDef)[];
  colDefsT2: (ColDef | ColGroupDef)[];
  colDefsT3: (ColDef | ColGroupDef)[];
  
  valueSetter(params: ValueSetterParams): boolean {
    const field = params.colDef.field;
    const value = params.newValue;
    const host: Host = params.data;
    const hostId = host.id;
    this.store.dispatch(new UpdateHost({ updates: { id: hostId, [field]: value } }));
    return params.oldValue != params.newValue;
  }

  onCheckboxChange(checked: boolean, params: ICellRendererParams) {
    const field = params.colDef.field;
    const host: Host = params.data;
    const hostId = host.id;
    this.store.dispatch(new UpdateHost({ updates: { id: hostId, [field]: checked } }));
  }

  constructor(private store: Store<HostsState>) {
    this.colDefsAll = [
      { headerName: 'IP',           field: 'ip',          editable: true,   pinned: 'left', ...this.colDefString },
      { headerName: 'Name',         field: 'name',        editable: true,   pinned: 'left', ...this.colDefString },
      { headerName: 'Type',         field: 'type',        editable: true,   pinned: 'left', ...this.colDefSelect, cellEditorParams: { values: hostTypes } },
      { headerName: 'Description',  field: 'description', editable: true,   pinned: null,   ...this.colDefString },
      { headerName: 'Note',         field: 'note',        editable: true,   pinned: null,   ...this.colDefLongString },
      { headerName: 'Basic',        field: 'basic',       editable: false,  pinned: null,   ...this.colDefBoolean },
      { headerName: 'NetworkDevice', children: [
        { headerName: 'Basic', field: 'networkInterface_basic',   editable: false,  pinned: null,   ...this.colDefBoolean },
        { headerName: 'Medium', field: 'networkInterface_medium',   editable: false,  pinned: null,   ...this.colDefBoolean },
        { headerName: 'Interfaces', field: 'networkInterface_interfaces',   editable: false,  pinned: null,   ...this.colDefBoolean },
      ] },           
      { headerName: 'T3',           field: 'template3',   editable: false,  pinned: null,   ...this.colDefBoolean },
    ];
    this.colDefsT1 = [
      { headerName: 'IP',           field: 'ip',               editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Name',         field: 'name',             editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template1_macro1', editable: true,    pinned: null,    ...this.colDefString },
      { headerName: 'Macro 2',      field: 'template1_macro2', editable: true,    pinned: null,    ...this.colDefString },
    ];
    this.colDefsT2 = [
      { headerName: 'IP',           field: 'ip',                editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Name',         field: 'name',              editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template2_macro1',  editable: true,    pinned: null,    ...this.colDefString },
    ];
    this.colDefsT3 = [
      { headerName: 'IP',           field: 'ip',                editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Name',         field: 'name',              editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template3_macro1',  editable: true,    pinned: null,    ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template3_macro2',  editable: true,    pinned: null,    ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template3_macro3',  editable: true,    pinned: null,    ...this.colDefString },
    ];
    this.rowsAll$ = this.store.select(fromHosts.selectHosts);
    this.rowsT1$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.basic)));
    this.rowsT2$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.networkInterface_basic)));
    this.rowsT3$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.template3)));
  }

  debug() {
    this.store.select(fromHosts.selectHosts).pipe(take(1))
    .subscribe(console.log);
  }

}
