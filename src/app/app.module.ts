import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// material components
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatToolbarModule,
  MatExpansionModule, MatSidenavModule, MatListModule
} from '@angular/material';

import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { hostsReducer } from './store/hosts.reducer';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TemplateTableComponent } from './components/template-table/template-table.component';
import { CellCheckboxComponent } from './components/cell-checkbox/cell-checkbox.component';
import { CellInputComponent } from './components/cell-input/cell-input.component';
import { CellTextAreaComponent } from './components/cell-text-area/cell-text-area.component';
import { CellSelectComponent } from './components/cell-select/cell-select.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateTableComponent,
    MonitoringComponent,
    CellCheckboxComponent,
    CellInputComponent,
    CellTextAreaComponent,
    CellSelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    AgGridModule.withComponents([
      CellCheckboxComponent,
      CellInputComponent,
      CellTextAreaComponent,
      CellSelectComponent
    ]),
    StoreModule.forRoot({ hosts: hostsReducer }),
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
