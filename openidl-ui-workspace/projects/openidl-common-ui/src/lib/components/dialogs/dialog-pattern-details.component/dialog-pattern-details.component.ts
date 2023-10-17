import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MESSAGE } from '../../../config/messageBundle';
import { CsvService } from '../../../services/csv.service';

@Component({
	selector: 'app-dialog-pattern-details',
	templateUrl: './dialog-pattern-details.component.html',
	styleUrls: ['./dialog-pattern-details.component.scss']
})
export class DialogPatternDetailsComponent implements OnDestroy {
	patternMessage = MESSAGE.EXTRACTION_PATTERN_MESSAGE.message;
	constructor(
		private dialogRef: MatDialogRef<DialogPatternDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private csvService: CsvService
	) {}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
	}

	onClickDownload() {
		const { extractionPatternName: name, extractionPatternID: id } =
			this.data.pattern[0];
		this.csvService.downloadCsv(this.data.pattern, `${name}-${id}`);
		this.dialogRef.close();
	}
}
