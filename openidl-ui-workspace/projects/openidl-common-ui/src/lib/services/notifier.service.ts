import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class NotifierService {
	constructor(private _snackBar: MatSnackBar) {}

	openSnackbar(type: string, title: string, message: string) {
		this._snackBar.open(`${title} : ${message}`, 'Close', {
			verticalPosition: 'top',
			duration: 5000
		});
	}
}
