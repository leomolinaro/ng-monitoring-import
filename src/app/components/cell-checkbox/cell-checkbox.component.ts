import { Component, OnInit, ViewChild } from '@angular/core';
import { AgRendererComponent } from "ag-grid-angular/main";
import { ICellRendererParams } from "ag-grid-community";
import { MatCheckbox, MatCheckboxChange } from '@angular/material';

export interface ICheckboxCellRendererParams extends ICellRendererParams {
  getHide?: (params: ICheckboxCellRendererParams) => boolean,
  onCheckboxChange: (newValue: boolean, params: ICheckboxCellRendererParams) => void
}

@Component({
  selector: 'app-cell-checkbox',
  templateUrl: './cell-checkbox.component.html',
  styleUrls: ['./cell-checkbox.component.scss']
})
export class CellCheckboxComponent implements OnInit, AgRendererComponent {
    
  @ViewChild('checkbox', {read: MatCheckbox}) checkbox: MatCheckbox;

  private params: ICheckboxCellRendererParams;
  
  checked = false;
  hide = false;

  refresh(): boolean {
    this.refreshDisabled();
    return true;
  }

  agInit(params: ICheckboxCellRendererParams): void {
    this.params = params;
    const field = this.params.colDef.field;
    const row = this.params.data;
    this.checked = row[field];
    this.refreshDisabled();
  }

  refreshDisabled() {
    if (this.params.getHide) {
      this.hide = this.params.getHide(this.params);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  onChange(event: MatCheckboxChange) {
    const newValue = event.checked;
    this.checked = newValue;
    this.params.onCheckboxChange(newValue, this.params);
  }

}
