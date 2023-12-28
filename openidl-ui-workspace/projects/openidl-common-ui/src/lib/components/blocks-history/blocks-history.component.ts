import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-blocks-history',
	templateUrl: './blocks-history.component.html',
	styleUrls: ['./blocks-history.component.scss']
})
export class BlocksHistoryComponent implements OnInit {
	blockList;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		const url = '/block-explorer';
		this.dataService.getData(url).subscribe((res) => {
			// console.log('Blocks', res);
			this.blockList = res;
		});
	}
}
