import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private httpOptions = {};
	private httpOptionsMultipart = {};
	private API_ENDPOINT;
	private apiToken;

	constructor(
		private http: HttpClient,
		private storageService: StorageService
	) {}

	getToken() {
		console.log('in getToken');
		// Following change to the end point is made as the end point is moved to UI server

		this.API_ENDPOINT = '/api';
		console.log('API_ENDPOINT');

		if (this.storageService.getItem('apiToken')) {
			this.apiToken = this.storageService.getItem('apiToken');
		} else {
			this.apiToken = '';
		}
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',

				UserToken: this.apiToken
			})
		};
		this.httpOptionsMultipart = {
			headers: new HttpHeaders({})
		};
	}

	/**
	 * Retrive data by status
	 */
	getDataByStatus(uri: string, status: string): Observable<any> {
		this.getToken();
		return this.http
			.get(this.API_ENDPOINT + uri + status, this.httpOptions)
			.pipe(
				map((response: HttpResponse<any>) => {
					const serviceResponse = response;
					console.log('statuscode', serviceResponse['success']);
					if (serviceResponse && serviceResponse.status === 200) {
						// serviceResponse['success'] === true
						return serviceResponse['result'];
					} else {
						console.log('Data could not be retrieved');
						throwError(serviceResponse['message']);
					}
				}),
				catchError(this.handleError)
			);
	}

	getData(uri) {
		this.getToken();
		return this.http.get(this.API_ENDPOINT + uri, this.httpOptions).pipe(
			map((response: Response) => {
				const serviceResponse = response;
				console.log('statuscode', serviceResponse['success']);
				if (serviceResponse && serviceResponse['success'] === true) {
					return serviceResponse['result'];
				} else {
					console.log('Data could not be retrieved');
					throwError(serviceResponse['message']);
				}
			}),
			catchError(this.handleError)
		);
	}

	deleteData(uri) {
		this.getToken();
		return this.http.delete(this.API_ENDPOINT + uri, this.httpOptions).pipe(
			map((response: Response) => {
				const serviceResponse = response;

				if (serviceResponse && serviceResponse['success'] === true) {
					return serviceResponse['result'];
				} else {
					console.log('Data could not be retrieved');
					throwError(serviceResponse['message']);
				}
			}),
			catchError(this.handleError)
		);
	}

	postData(uri, requstObject: any): Observable<number> {
		this.getToken();
		return this.http
			.post(
				this.API_ENDPOINT + uri,
				JSON.stringify(requstObject),
				this.httpOptions
			)
			.pipe(
				map((response: Response) => {
					const serviceResponse = response;

					if (
						serviceResponse &&
						serviceResponse['success'] === true
					) {
						console.log('New Data call created successfully');
						return (
							serviceResponse['message'] ||
							serviceResponse['result']
						);
					} else {
						console.log('Technical error');

						throwError('Technical Error occurred'); // serviceResponse.message
					}
				}),
				catchError(this.handleError)
			);
	}

	putData(uri, requstObject: any): Observable<number> {
		this.getToken();
		return this.http
			.put(
				this.API_ENDPOINT + uri,
				JSON.stringify(requstObject),
				this.httpOptions
			)
			.pipe(
				map((response: Response) => {
					const serviceResponse = response;

					if (
						serviceResponse &&
						serviceResponse['success'] === true
					) {
						console.log('New Data call created successfully');
						return serviceResponse['message'];
					} else {
						console.log('Technical error');
						throwError('Technical Error occurred'); // serviceResponse.message
					}
				}),
				catchError(this.handleError)
			);
	}

	getHistory(id) {
		this.getToken();
		return this.http.get(this.API_ENDPOINT + '' + id).pipe(
			map((response: Response) => {
				const serviceResponse = response;

				if (serviceResponse && serviceResponse['success'] === true) {
					return serviceResponse['result'];
				} else {
					console.log('Data could not be retrieved');
					throwError(serviceResponse['message']);
				}
			}),
			catchError(this.handleError)
		);
	}

	// POST file and form data
	postMultipart(formData: FormData) {
		this.getToken();
		return this.http
			.post(
				this.API_ENDPOINT + 'file',
				formData,
				this.httpOptionsMultipart
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}

	private extractData(res: Response) {
		const body = res;

		return body || {};
	}

	/**
	 * Handle error messages raising out of http error
	 *
	 */
	private handleError(error: HttpResponse<any> | any): ObservableInput<any> {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		console.log('Error message received' + error);
		if (error instanceof HttpResponse) {
			// const body = error || '';
			// const err = body.error || JSON.stringify(body);
			errMsg = `Error communicating to server`;
		} else {
			errMsg = error.error ? error.error : 'Server returned exception';
			console.error('dataservice - error : ', errMsg);
		}
		return throwError(errMsg);
	}
}
