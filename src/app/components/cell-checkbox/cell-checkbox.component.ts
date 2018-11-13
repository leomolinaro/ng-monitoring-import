import { Component, OnInit, ViewChild } from '@angular/core';
import { AgRendererComponent } from "ag-grid-angular/main";
import { ICellRendererParams } from "ag-grid-community";
import { MatCheckbox, MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-cell-checkbox',
  templateUrl: './cell-checkbox.component.html',
  styleUrls: ['./cell-checkbox.component.scss']
})
export class CellCheckboxComponent implements OnInit, AgRendererComponent {
    
  @ViewChild('checkbox', {read: MatCheckbox}) checkbox: MatCheckbox;

  private params: ICellRendererParams;
  
  private checked = false;

  refresh(params: any): boolean {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    const field = this.params.colDef.field;
    const row = this.params.data;
    this.checked = row[field];
  }

  constructor() { }

  ngOnInit() {
  }

  toggleSelection(event: MatCheckboxChange) {
    const newValue = event.checked;
    const oldValue = !newValue;
    this.checked = newValue;
    this.params.context.onCheckboxChange(newValue, this.params);
    // const valueSetterParams:ValueSetterParams = {
    //   oldValue: oldValue,
    //   newValue: newValue,
    //   node: this.params.node,
    //   colDef: this.params.colDef,
    //   data: this.params.data,
    //   column: this.params.column,
    //   api: this.params.api,
    //   columnApi: this.params.columnApi,
    //   context: this.params.context
    // }
    // this.params.colDef.valueSetter(valueSetterParams);
  }

}
