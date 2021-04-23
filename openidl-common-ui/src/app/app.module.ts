// SPDX-License-Identifier: Apache-2.0
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';
import { ConfigModule } from './config/config.module';
import { ServicesModule } from './services/services.module';
import { OpenidlCommonComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { DataTableModule } from 'angular-6-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchComponent } from './components/search/search.component';
import { CookieService } from 'ngx-cookie-service';
import { NotifyComponent } from './components/notify/notify.component';
import { SearchPipe } from './pipes/search.pipe';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DatacallsIssuedComponent } from './components/datacalls-issued/datacalls-issued.component';
import { DatacallHistoryComponent } from './components/datacall-history/datacall-history.component';
import { BlocksHistoryComponent } from './components/blocks-history/blocks-history.component';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { UpdateReportComponent } from './components/update-report/update-report.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DownloadToCsvComponent } from './components/download-to-csv/download-to-csv.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    OpenidlCommonComponent,
    LoginComponent,
    HeaderComponent,
    FormComponent,
    TableComponent,
    SpinnerComponent,
    PaginationComponent,
    DownloadToCsvComponent,
    SearchComponent,
    NotifyComponent,
    SearchPipe,
    UpdateFormComponent,
    ModalComponent,
    DatacallsIssuedComponent,
    DatacallHistoryComponent,
    BlocksHistoryComponent,
    UpdateReportComponent,
    ReportTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    PipesModule,
    ComponentsModule,
    ConfigModule,
    ServicesModule,
    LoginModule,
    DataTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ClipboardModule
  ],
  exports: [
    OpenidlCommonComponent,
    FormComponent,
    TableComponent,
    ServicesModule,
    SearchComponent,
    SpinnerComponent,
    PaginationComponent,
    DownloadToCsvComponent,
    SearchComponent,
    NotifyComponent,
    SearchPipe,
    UpdateFormComponent,
    ModalComponent,
    DatacallsIssuedComponent,
    DatacallHistoryComponent,
    BlocksHistoryComponent,
    UpdateReportComponent,
    ReportTableComponent
  ],
  providers: [CookieService, BsModalService],
  bootstrap: [OpenidlCommonComponent]
})
export class OpenidlCommonModule { }
