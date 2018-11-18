import { Template } from './../../models/template';
import { ICheckboxCellRendererParams } from './../cell-checkbox/cell-checkbox.component';
import { TemplateDefinitionsService } from './../../services/template-definitions.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GridOptions, ICellRendererParams, ColDef, ColGroupDef, ValueSetterParams, ICellEditorParams, CellValueChangedEvent } from 'ag-grid-community';
import { Host, hostTypes, HostType } from '../../models/host';
import { UpdateHost, AddHost } from '../../store/hosts.actions';
import { Store } from '@ngrx/store';
import { HostsState } from '../../store/hosts.reducer';

import * as fromHosts from '../../store/hosts.reducer';
import { AgGridNg2 } from 'ag-grid-angular';
import { CellInputComponent } from '../cell-input/cell-input.component';
import { CellTextAreaComponent } from '../cell-text-area/cell-text-area.component';
import { CellCheckboxComponent } from '../cell-checkbox/cell-checkbox.component';
import { CellSelectComponent } from '../cell-select/cell-select.component';

interface TemplateView {
  id: string,
  panelName: string,
  gridOptions: GridOptions,
  colDefs: ColDef[],
  rows$: Observable<Host[]> 
}

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, AfterViewInit {

  gridOptionsAll = { ...this.gridOptions };
  rowsAll$: Observable<Host[]>;
  colDefsAll: (ColDef | ColGroupDef)[];
  @ViewChild("generalGrid") generalGrid: AgGridNg2;
  templateViews: TemplateView[] = [];
  openPanel = "general";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  
  private readonly gridOptions: GridOptions = {
    enableSorting: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    // rowHeight: 25,
    animateRows: true,
    // onCellValueChanged: (event: CellValueChangedEvent) => this.dispatchUpdate(event),
    deltaRowDataMode: true,
    getRowNodeId: row => row.id
  };

  private readonly colDefString: ColDef = {
    cellEditorFramework: CellInputComponent,
    valueSetter: (params) => this.valueSetter(params)
  };

  private readonly colDefLongString: ColDef = {
    cellEditorFramework: CellTextAreaComponent,
    valueSetter: (params) => this.valueSetter(params)
  };

  private readonly colDefSelect: ColDef = { 
    suppressKeyboardEvent: (params) => {
      var keyCode = params.event.keyCode;
      var gridShouldDoNothing = params.editing && (keyCode===38 || keyCode===40);
      return gridShouldDoNothing;
    },
    cellEditorFramework: CellSelectComponent,
    valueSetter: (params) => this.valueSetter(params)
  };

  private readonly colDefBoolean: ColDef = {
    cellRendererFramework: CellCheckboxComponent,
    cellRendererParams: {
      onCheckboxChange: (checked: boolean, params: ICellRendererParams) => this.booleanValueSetter(checked, params)
    }
  };

  valueSetter(params: ValueSetterParams): boolean {
    const field = params.colDef.field;
    const value = params.newValue;
    const host: Host = params.data;
    const hostId = host.id;
    this.updateHost(hostId, field, value);
    return params.oldValue != params.newValue;
  }
  
  booleanValueSetter(checked: boolean, params: ICellRendererParams) {
    const field = params.colDef.field;
    const host: Host = params.data;
    const hostId = host.id;
    this.updateHost(hostId, field, checked);
  }

  areTpyeTemplateCompatible(type: HostType, template: Template) {
    return template.hostTypes.includes(type);
  }

  ngOnInit() {

    this.rowsAll$ = this.store.select(fromHosts.selectHosts);

    this.colDefsAll = [
      { headerName: 'IP',           field: 'ip',          editable: true,   pinned: 'left', ...this.colDefString },
      { headerName: 'Name',         field: 'name',        editable: true,   pinned: 'left', ...this.colDefString },
      {
        headerName: 'Type',         field: 'type',        editable: true,   pinned: 'left', ...this.colDefSelect,
        cellEditorParams: { values: hostTypes },
        onCellValueChanged: (params: CellValueChangedEvent) => params.api.refreshCells({ rowNodes: [params.node], force: true })
      },
      { headerName: 'Description',  field: 'description', editable: true, ...this.colDefString },
      { headerName: 'Note',         field: 'note',        editable: true, ...this.colDefLongString }
    ];

    const templateGroups = this.templateDefs.get();
    for (const templateGroup of templateGroups) {
      const children: ColDef[] = [];
      for (const template of templateGroup.templates) {
        const colDef: ColDef = {
          headerName: template.label, field: template.field, editable: false,
          ...this.colDefBoolean,
          cellRendererParams: {
            ...this.colDefBoolean.cellRendererParams,
            getHide: (params: ICellRendererParams) => !this.areTpyeTemplateCompatible(params.node.data.type, template)
          }
        };
        children.push(colDef);
        const templateView: TemplateView = {
          id: template.field,
          panelName: templateGroup.label + " - " + template.label,
          gridOptions: { ...this.gridOptions },
          colDefs: [
            { headerName: 'IP', field: 'ip', editable: false, pinned: 'left', ...this.colDefString },
            { headerName: 'Name', field: 'name', editable: false, pinned: 'left', ...this.colDefString },
          ],
          rows$: this.rowsAll$
            .pipe(
              map(hosts => 
                hosts.filter(host => host[template.field] && this.areTpyeTemplateCompatible(host.type, template))
              )
            )
        };
        for (const macro of template.macros) {
          const macroColDef: ColDef = { headerName: macro.label, field: macro.field, editable: true, ...this.colDefString };
          templateView.colDefs.push(macroColDef);
        }
        this.templateViews.push(templateView);
      }
      const colGroupDef: ColGroupDef = { headerName: templateGroup.label, children: children }
      this.colDefsAll.push(colGroupDef);
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<HostsState>,
    private templateDefs: TemplateDefinitionsService) {
  }

  ngAfterViewInit() {
    this.launchAutoSize()
  }

  addHost() {
    this.store.dispatch(new AddHost({ host: {
      id: null,
      ip: "",
      name: "",
      type: null,
      pingBasic: true,
    } }));
    this.launchAutoSize();
  }

  removeHosts() {
    // TODO
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
