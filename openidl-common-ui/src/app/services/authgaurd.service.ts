// SPDX-License-Identifier: Apache-2.0
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private r: Router,
    private storageService: StorageService,
    private cookieService: CookieService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    console.log('Checking the AuthGuard');
    console.log('Route Requested' + JSON.stringify(state.url));
    if (this.storageService.getItem('apiToken')) {
      return true;
    }
      this.r.navigateByUrl('/login');
      return false;
  }
}
