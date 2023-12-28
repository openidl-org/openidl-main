import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Output() searchValue = new EventEmitter();

	searchInput: String;
	searchButtonReadOnly: boolean = true;

	constructor(private storageService: StorageService) {}

	ngOnInit() {
		if (
			this.storageService.getItem('searchValue') != '' &&
			this.storageService.getItem('searchValue') != null
		) {
			this.searchInput = this.storageService.getItem('searchValue');
			this.searchButtonReadOnly = false;
		}
	}

	search(event) {
		if (event == 'clear') {
			this.searchInput = '';
			this.searchButtonReadOnly = true;
		} else this.searchButtonReadOnly = false;
		this.searchValue.emit(this.searchInput);
	}
}
