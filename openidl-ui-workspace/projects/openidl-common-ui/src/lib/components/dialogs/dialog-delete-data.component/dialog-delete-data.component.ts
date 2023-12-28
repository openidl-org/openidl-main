import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-delete-data',
	templateUrl: 'dialog-delete-data.component.html'
})
export class DialogDeleteDataComponent implements OnDestroy {
	constructor(
		public dialogRef: MatDialogRef<DialogDeleteDataComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
	}

	onClickYes() {}
}
