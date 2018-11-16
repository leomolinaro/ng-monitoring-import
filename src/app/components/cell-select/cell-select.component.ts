import { Component, OnInit, ViewChild } from '@angular/core';
import { ICellEditorParams } from "ag-grid-community";
import { AgEditorComponent, } from "ag-grid-angular";
import { MatSelect } from "@angular/material";

@Component({
  selector: 'app-cell-select',
  templateUrl: './cell-select.component.html',
  styleUrls: ['./cell-select.component.scss']
})
export class CellSelectComponent implements OnInit, AgEditorComponent {

  columnWidth: string;
  values: [ string ];
  params: ICellEditorParams;
  value: string;

  @ViewChild('select', {read: MatSelect}) select: MatSelect;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.select.open();
    setTimeout(() => {
      this.select.focus();
    });
  }

  isPopup(): boolean {
    return true;
  }

  isCancelBeforeStart(): boolean {
    return false;
  }

  isCancelAfterEnd(): boolean {
    console.log("isCancelAfterEnd", this.value);
    return false;
  }

  agInit(params: any): void {
    this.params = params;
    this.columnWidth = params.column.actualWidth + "px";
    this.values = params.values;
    this.value = params.value;
  }

  getValue(): string {
    console.log("getValue", this.value);
    return this.value;
  }

  // onSelectChange(e): void {
  //   console.log("e", e);
  //   this.params.stopEditing();
  // }

}
