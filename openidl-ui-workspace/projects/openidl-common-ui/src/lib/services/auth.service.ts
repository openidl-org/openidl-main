import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ObservableInput } from 'rxjs/internal/types';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private API_ENDPOINT;
	private httpOptions;

	constructor(
		private router: Router,
		private http: HttpClient,
		private storageService: StorageService
	) {
		// Following change to the end point is made as the end point is moved to UI server

		this.API_ENDPOINT = '/api';
		this.httpOptions = this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
	}

	authenticate(model: any) {
		return this.http
			.post(this.API_ENDPOINT + '/login', JSON.stringify(model), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			})
			.pipe(
				map((response: HttpResponse<any>) => {
					// login successful if there's a jwt token in the response

					const serviceResponse = response;

					if (
						serviceResponse &&
						serviceResponse['success'] === true
					) {
						//
						console.log('login success');
						return serviceResponse;
					} else {
						console.log('login failure');
						throw throwError(serviceResponse);
					}
				}),
				catchError(this.handleError)
			);
	}

	private handleError(
		error: any,
		caught: Observable<any>
	): ObservableInput<{}> {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		console.log('Error message received' + JSON.stringify(error));
		if (error instanceof HttpResponse) {
			const body = error || '';
			const err = body['error'] || JSON.stringify(body);
			errMsg = `Error in communicating to server`;
		} else {
			errMsg = error['error']
				? error['error']
				: 'Server returned exception';
		}

		return throwError(errMsg);
	}

	logout(route: string) {
		return this.http
			.post(
				this.API_ENDPOINT + '/logout',
				{},
				{
					headers: new HttpHeaders({
						'Content-Type': 'application/json'
					})
				}
			)
			.pipe(
				map((response: HttpResponse<any>) => {
					// login successful if there's a jwt token in the response

					const serviceResponse = response;

					if (
						serviceResponse &&
						serviceResponse['success'] === true
					) {
						//
						console.log('logout success');
						this.storageService.clearItem('apiToken');
						this.storageService.clearItem('datacall');
						this.storageService.clearItem('jurisdiction');
						this.storageService.clearItem('org');
						this.storageService.clearItem('role');
						this.storageService.clearItem('currentTab');
						this.storageService.clearItem('loginResult');
						sessionStorage.removeItem('isModalOpen');
						this.router.navigate([route]);
						return serviceResponse;
					} else {
						console.log('logout failure');
						throw throwError(serviceResponse);
					}
				}),
				catchError(this.handleError)
			);
	}
}
