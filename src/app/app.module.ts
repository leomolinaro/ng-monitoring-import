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
    MatToolbarModule
} from '@angular/material';

import { AgGridModule } from 'ag-grid-angular';
import { AgGridMaterialTextEditorComponent } from './ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import { AgGridMaterialSelectEditorComponent } from './ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import { AgGridMaterialCheckboxCellComponent } from './ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialTextareaEditorComponent } from './ag-grid-material-textarea-editor/ag-grid-material-textarea-editor.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';

@NgModule({
    declarations: [
        AppComponent,
        AgGridMaterialTextEditorComponent,
        AgGridMaterialSelectEditorComponent,
        AgGridMaterialCheckboxCellComponent,
        AgGridMaterialTextareaEditorComponent,
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
        AgGridModule.withComponents([
            AgGridMaterialTextEditorComponent,
            AgGridMaterialSelectEditorComponent,
            AgGridMaterialCheckboxCellComponent,
            AgGridMaterialTextareaEditorComponent
        ]),
        StoreModule.forRoot(appReducer)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
