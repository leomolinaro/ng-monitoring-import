import { Component, OnInit, ViewChild } from '@angular/core';
import { AgRendererComponent } from "ag-grid-angular/main";
import { ICellRendererParams } from "ag-grid-community";
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-ag-grid-material-checkbox-cell',
  template: `<mat-checkbox #checkbox (change)="toggleSelection($event)" [checked]="checked"></mat-checkbox>`
})
export class AgGridMaterialCheckboxCellComponent implements OnInit, AgRendererComponent {
    
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

  toggleSelection(event) {
    this.checked = !this.checked;
    const field = this.params.colDef.field;
    const row = this.params.data;
    row[field] = this.checked;
  }

}
