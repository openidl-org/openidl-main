import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
@Component({
	selector: 'app-datacall-history',
	templateUrl: './datacall-history.component.html',
	styleUrls: ['./datacall-history.component.scss']
})
export class DatacallHistoryComponent implements OnInit {
	datacall: any;
	datacallHistory: any;

	constructor(
		private dataService: DataService,
		private storageService: StorageService
	) {}

	ngOnInit() {
		this.datacall = this.storageService.getItem('datacall');
		this.getDatacallHistory(this.datacall.id, this.datacall.version);
	}

	getDatacallHistory(id, version) {
		const url = '/data-call-log/' + id + '/' + version;
		this.dataService.getData(url).subscribe((resp) => {
			// console.log('history resp: ', resp);
			this.datacallHistory = JSON.parse(resp);
			if (this.datacallHistory && this.datacallHistory.length > 0) {
				this.datacallHistory.forEach((element) => {
					element.actionTs = this.formatDate(element.actionTs);
				});
			}
		});
	}

	formatDate(d) {
		console.log('date:: ', d, ' local date', new Date(d));
		const date = new Date(d);
		let dd: any = date.getDate();
		let ss = 'AM';
		const mm: any = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		let hr: any = date.getHours();
		let min: any = date.getMinutes();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (hr == 12) {
			ss = 'PM';
		} else if (hr > 12) {
			hr = hr - 12;
			ss = 'PM';
		}
		if (hr < 10) {
			hr = '0' + hr;
		}
		if (min < 10) {
			min = '0' + min;
		}
		return (d =
			mm + '/' + dd + '/' + yyyy + '  ' + hr + ':' + min + ' ' + ss);
	}
}
