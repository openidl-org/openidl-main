import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-confirmation',
	templateUrl: 'dialog-confirmation.component.html'
})
export class DialogConfirmationComponent implements OnDestroy {
	constructor(
		public dialogRef: MatDialogRef<DialogConfirmationComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log(data);
	}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
	}

	onClickYes() {}
}
