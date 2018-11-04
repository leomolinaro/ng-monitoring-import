import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import {AgGridMaterialTextEditorComponent} from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import {AgGridMaterialSelectEditorComponent} from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import {AgGridMaterialCheckboxCellComponent} from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialTextareaEditorComponent } from './ag-grid-material-textarea-editor/ag-grid-material-textarea-editor.component';

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
  public rowData: any[];
  private columnDefs: any[];

  constructor() {
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

    this.rowData = [
      { ip: '10.10.10.251', name: 'Sonda Best monitoring', type: 'Server', basic: true },
      { ip: '10.10.20.233', name: 'Cisco_WLC', type: 'WiFi Controller', basic: false },
      { ip: '10.10.20.240', name: 'Cisco_WLC_2', type: 'WiFi Controller', basic: false },
      { ip: '172.18.12.4', name: 'Pr_Via_Oderzo_1 VS Via_Oderzo_12', type: 'Bridge Radio', basic: false },
      { ip: '172.18.12.3', name: 'Pr_Via_Oderzo_12 VS Via_Oderzo_1', type: 'Bridge Radio', basic: false },
      { ip: '172.18.21.4', name: 'Pr_Via_Oderzo_12 VS Via_Oderzo_21', type: 'Bridge Radio', basic: false },
      { ip: '172.18.21.3', name: 'Pr_Via_Oderzo_21 VS Via_Oderzo_12', type: 'Bridge Radio', basic: false },
      { ip: '172.18.1.3', name: 'Pr_Via_Oderzo_1 VS Via_Oderzo_21', type: 'Bridge Radio', basic: false },
      { ip: '172.18.1.4', name: 'Pr_Via_Oderzo_21 VS Via_Oderzo_1', type: 'Bridge Radio', basic: false },
      { ip: '10.10.10.253', name: 'Mikrotik Via_Oderzo_1', type: 'Router', basic: false },
      { ip: '10.10.20.253', name: 'Mikrotik Via_Oderzo_21', type: 'Router', basic: false },
      { ip: '192.168.30.253', name: 'Mikrotik Via_Oderzo_12', type: 'Router', basic: false },
      { ip: '10.10.20.250', name: 'SW_2960_MAG_UD_1', type: 'Switch', basic: false },
      { ip: '10.10.20.249', name: 'SW_2960_MAG_UD_2', type: 'Switch', basic: false },
      { ip: '10.10.20.248', name: 'SW_2960_MAG_UD_3', type: 'Switch', basic: false },
      { ip: '10.10.20.246', name: 'HP 2524 TC3', type: 'Switch', basic: false },
      { ip: '10.10.20.245', name: 'HP 2524 Mag3', type: 'Switch', basic: false },
      { ip: '10.10.20.243', name: 'Switch HP2510 MADIMER', type: 'Switch', basic: false },
      { ip: '10.10.20.244', name: 'MAG_UD', type: 'Switch', basic: false },
      { ip: '10.10.20.238', name: 'Switch HP2530 Via_Oderzo_12 SW_2', type: 'Switch', basic: false },
      { ip: '10.10.20.237', name: 'Switch HP2530 Via_Oderzo_12 SW_1', type: 'Switch', basic: false },
      { ip: '10.0.0.52', name: 'Sw_2_Ced_Via_Oderzo_1', type: 'Switch', basic: false },
      { ip: '10.0.0.53', name: 'Sw_1_Ced_Via_Oderzo_1', type: 'Switch', basic: false },
      { ip: '10.0.0.51', name: 'Sw_3_Ced_Via_Oderzo_1', type: 'Switch', basic: false },
      { ip: '10.0.0.54', name: 'Sw_Oderzo1_Uffici', type: 'Switch', basic: false }
    ];
  }

  debug() {
    console.log(this.rowData);
  }

}
