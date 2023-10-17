import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './components/login/login.module';
import { PipesModule } from './pipes/pipes.module';
import { ConfigModule } from './config/config.module';
import { DialogModule } from './components/dialogs/dialog.module';
import { MaterialModule } from './material.module';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomDateFormat, FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchComponent } from './components/search/search.component';
import { CustomDateFormat1, UpdateFormComponent } from './components/update-form/update-form.component';
import { DatacallsIssuedComponent } from './components/datacalls-issued/datacalls-issued.component';
import { DatacallHistoryComponent } from './components/datacall-history/datacall-history.component';
import { BlocksHistoryComponent } from './components/blocks-history/blocks-history.component';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { UpdateReportComponent } from './components/update-report/update-report.component';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FormComponent,
    TableComponent,
    SpinnerComponent,
    SearchComponent,
    UpdateFormComponent,
    DatacallsIssuedComponent,
    DatacallHistoryComponent,
    BlocksHistoryComponent,
    UpdateReportComponent,
    ReportTableComponent,
    CustomDateFormat,
    CustomDateFormat1
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PipesModule,
    ConfigModule,
    LoginModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogModule,
  ],
  exports: [
    FormComponent,
    TableComponent,
    SearchComponent,
    SpinnerComponent,
    SearchComponent,
    UpdateFormComponent,
    DatacallsIssuedComponent,
    DatacallHistoryComponent,
    BlocksHistoryComponent,
    UpdateReportComponent,
    ReportTableComponent,
    MaterialModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class OpenidlCommonModule {}
