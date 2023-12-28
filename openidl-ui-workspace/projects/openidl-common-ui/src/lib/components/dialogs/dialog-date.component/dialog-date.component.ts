import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-date',
	templateUrl: 'dialog-date.component.html'
})
export class DialogDateComponent implements OnDestroy {
	constructor(
		public dialogRef: MatDialogRef<DialogDateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
	}

	onClickUpdate() {}
}
