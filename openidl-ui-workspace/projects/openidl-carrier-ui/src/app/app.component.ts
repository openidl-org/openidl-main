import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Openidl app';
	API_ENDPOINT = environment.DATA_CALL_CARRIER_APP_URL;

	constructor() {
		localStorage.setItem('API_ENDPOINT', JSON.stringify(this.API_ENDPOINT));
	}
	ngOnInit() {
		sessionStorage.removeItem('isModalOpen');
	}
}
