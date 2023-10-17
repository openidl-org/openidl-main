import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-forum',
	templateUrl: 'dialog-forum.component.html'
})
export class DialogForumComponent implements OnDestroy {
	constructor(
		public dialogRef: MatDialogRef<DialogForumComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
	}
}
