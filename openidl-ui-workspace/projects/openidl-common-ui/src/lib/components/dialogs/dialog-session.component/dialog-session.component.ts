import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-dialog-session',
	templateUrl: 'dialog-session.component.html'
})
export class DialogSessionComponent implements OnDestroy {
	private authSubscription: Subscription;

	constructor(
		public dialogRef: MatDialogRef<DialogSessionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private authService: AuthService
	) {}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
		if (this.authSubscription) this.authSubscription.unsubscribe();
	}

	redirectToLogin() {
		this.authSubscription = this.authService.logout('login').subscribe(
			(resp) => {
				console.log(resp);
				this.dialogRef.close();
			},
			(err) => {
				console.log(err);
				this.dialogRef.close();
			}
		);
		// this.redirectLogin.emit();
	}
}
