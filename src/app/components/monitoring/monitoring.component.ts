import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GridOptions, ICellRendererParams, ColDef, ColGroupDef, ValueSetterParams } from 'ag-grid-community';
import { Host, hostTypes } from '../../models/host';
import { UpdateHost, AddHost } from '../../store/hosts.actions';
import { Store } from '@ngrx/store';
import { HostsState } from '../../store/hosts.reducer';

import * as fromHosts from '../../store/hosts.reducer';
import { AgGridNg2 } from 'ag-grid-angular';
import { CellInputComponent } from '../cell-input/cell-input.component';
import { CellTextAreaComponent } from '../cell-text-area/cell-text-area.component';
import { CellCheckboxComponent } from '../cell-checkbox/cell-checkbox.component';
import { CellSelectComponent } from '../cell-select/cell-select.component';

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements AfterViewInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  private readonly gridOptions: GridOptions = {
    enableSorting: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    // rowHeight: 25,
    animateRows: true,
    // onCellValueChanged: (event: CellValueChangedEvent) => this.dispatchUpdate(event),
    deltaRowDataMode: true,
    context: { onCheckboxChange: (checked: boolean, params: ICellRendererParams) => this.onCheckboxChange(checked, params) },
    getRowNodeId: row => row.id
  };

  private readonly colDefString: ColDef =      { cellEditorFramework: CellInputComponent,     valueSetter: (params) => this.valueSetter(params) };
  private readonly colDefLongString: ColDef =  { cellEditorFramework: CellTextAreaComponent,     valueSetter: (params) => this.valueSetter(params) };
  private readonly colDefSelect: ColDef =      { 
    suppressKeyboardEvent: (params) => {
      var keyCode = params.event.keyCode;
      var gridShouldDoNothing = params.editing && (keyCode===38 || keyCode===40);
      return gridShouldDoNothing;
    },
    
    cellEditorFramework: CellSelectComponent,   valueSetter: (params) => this.valueSetter(params) };
  private readonly colDefBoolean: ColDef =     { cellRendererFramework: CellCheckboxComponent };

  gridOptionsAll = { ...this.gridOptions };
  gridOptionsBasic = { ...this.gridOptions };
  gridOptionsNetIntBasic = { ...this.gridOptions };
  gridOptionsNetIntMedium = { ...this.gridOptions };
  rowsAll$: Observable<Host[]>;
  rowsBasic$: Observable<Host[]>;
  rowsNetIntBasic$: Observable<Host[]>;
  rowsNetIntMedium$: Observable<Host[]>;
  colDefsAll: (ColDef | ColGroupDef)[];
  colDefsBasic: (ColDef | ColGroupDef)[];
  colDefsNetIntBasic: (ColDef | ColGroupDef)[];
  colDefsNetIntMedium: (ColDef | ColGroupDef)[];
  
  valueSetter(params: ValueSetterParams): boolean {
    const field = params.colDef.field;
    const value = params.newValue;
    const host: Host = params.data;
    const hostId = host.id;
    this.updateHost(hostId, field, value);
    return params.oldValue != params.newValue;
  }
  
  onCheckboxChange(checked: boolean, params: ICellRendererParams) {
    const field = params.colDef.field;
    const host: Host = params.data;
    const hostId = host.id;
    this.updateHost(hostId, field, checked);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<HostsState>) {
    this.colDefsAll = [
      { headerName: 'IP',           field: 'ip',          editable: true,   pinned: 'left', ...this.colDefString },
      { headerName: 'Name',         field: 'name',        editable: true,   pinned: 'left', ...this.colDefString },
      { headerName: 'Type',         field: 'type',        editable: true,   pinned: 'left', ...this.colDefSelect, cellEditorParams: { values: hostTypes } },
      { headerName: 'Description',  field: 'description', editable: true,   pinned: null,   ...this.colDefString },
      { headerName: 'Note',         field: 'note',        editable: true,   pinned: null,   ...this.colDefLongString },
      { headerName: 'Basic',        field: 'basic',       editable: false,  pinned: null,   ...this.colDefBoolean },
      { headerName: 'Network Device', children: [
        { headerName: 'Network Device\nBasic', field: 'networkInterface_basic',   editable: false,  pinned: null,   ...this.colDefBoolean },
        { headerName: 'Medium', field: 'networkInterface_medium',   editable: false,  pinned: null,   ...this.colDefBoolean },
        { headerName: 'Interfaces', field: 'networkInterface_interfaces',   editable: false,  pinned: null,   ...this.colDefBoolean },
      ] },           
      { headerName: 'T3',           field: 'template3',   editable: false,  pinned: null,   ...this.colDefBoolean },
    ];
    this.colDefsBasic = [
      { headerName: 'IP',           field: 'ip',               editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Name',         field: 'name',             editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template1_macro1', editable: true,    pinned: null,    ...this.colDefString },
      { headerName: 'Macro 2',      field: 'template1_macro2', editable: true,    pinned: null,    ...this.colDefString },
    ];
    this.colDefsNetIntBasic = [
      { headerName: 'IP',           field: 'ip',                editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Name',         field: 'name',              editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template2_macro1',  editable: true,    pinned: null,    ...this.colDefString },
    ];
    this.colDefsNetIntMedium = [
      { headerName: 'IP',           field: 'ip',                editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Name',         field: 'name',              editable: false,   pinned: 'left',  ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template3_macro1',  editable: true,    pinned: null,    ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template3_macro2',  editable: true,    pinned: null,    ...this.colDefString },
      { headerName: 'Macro 1',      field: 'template3_macro3',  editable: true,    pinned: null,    ...this.colDefString },
    ];
    this.rowsAll$ = this.store.select(fromHosts.selectHosts);
    this.rowsBasic$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.basic)));
    this.rowsNetIntBasic$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.networkInterface_basic)));
    this.rowsNetIntMedium$ = this.rowsAll$.pipe(map(hosts => hosts.filter(host => host.template3)));
  }

  @ViewChild("generalGrid") generalGrid: AgGridNg2;

  ngAfterViewInit() {
    this.launchAutoSize()
  }

  addHost() {
    this.store.dispatch(new AddHost({ host: {
      id: null,
      basic: true,
      ip: "",
      name: "",
      networkInterface_basic: false,
      networkInterface_interfaces: false,
      networkInterface_medium: false,
      template1_macro1: "",
      template1_macro2: 0,
      template2_macro1: "",
      template3: false,
      template3_macro1: "",
      template3_macro2: "",
      template3_macro3: "",
      type: null
    } }));
    this.launchAutoSize();
  }

  removeHosts() {
    this.launchAutoSize()
  }

  updateHost(hostId: number, field: string, value: any) {
    this.store.dispatch(new UpdateHost({ updates: { id: hostId, [field]: value } }));
    this.launchAutoSize();
  }

  debug() {
    this.store.select(fromHosts.selectHosts).pipe(take(1))
    .subscribe(console.log);
  }

  launchAutoSize() {
    setTimeout(() => this.generalGrid.columnApi.autoSizeAllColumns());
  }

}
