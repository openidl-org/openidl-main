// SPDX-License-Identifier: Apache-2.0
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGaurdService } from './authgaurd.service';
import { DataService } from './data.service';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthGaurdService, DataService, StorageService, AuthService]
})
export class ServicesModule { }
