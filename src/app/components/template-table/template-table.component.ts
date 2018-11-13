import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss']
})
export class TemplateTableComponent implements OnInit {

  @Input() gridOptions;
  @Input() colDefs;
  @Input() rows;

  constructor() { }

  ngOnInit() {
  }

}
