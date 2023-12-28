import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-base-dialog',
	templateUrl: './base-dialog.component.html',
	styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent implements OnInit {
	@Input() title: string = '';
	@Input() type: string = 'info';

	constructor() {}

	ngOnInit() {}
}
