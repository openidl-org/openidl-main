// SPDX-License-Identifier: Apache-2.0
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGaurdService } from './../../lib/src/app/services/authgaurd.service';
import { StorageService } from './../../lib/src/app/services/storage.service';
import { DataService } from './../../lib/src/app/services/data.service';
import { AuthService } from './../../lib/src/app/services/auth.service';
import { AppComponent } from './app.component';
import { OpenidlCommonModule } from '../../lib/src/app/app.module';
import { DatacallListComponent } from './datacall-list/datacall-list.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './router/app.routes';
import { TabsModule } from 'ngx-bootstrap';
import { ViewDatacallDraftComponent } from './view-datacall-draft/view-datacall-draft.component';
import { ViewDatacallIssuedComponent } from './view-datacall-issued/view-datacall-issued.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    DatacallListComponent,
    LoginComponent,
    HeaderComponent,
    ViewDatacallDraftComponent,
    ViewDatacallIssuedComponent,
    ViewReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OpenidlCommonModule,
    TabsModule.forRoot(),
    ClipboardModule
  ],
  providers: [AuthGaurdService, StorageService, DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
