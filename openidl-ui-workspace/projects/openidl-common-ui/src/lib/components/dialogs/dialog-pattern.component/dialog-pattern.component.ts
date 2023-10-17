import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { MESSAGE } from '../../../config/messageBundle';
import { CsvService } from '../../../services/csv.service';

@Component({
	selector: 'app-dialog-pattern',
	templateUrl: './dialog-pattern.component.html',
	styleUrls: ['./dialog-pattern.component.scss']
})
export class DialogPatternComponent implements OnDestroy {
	patternMessage = MESSAGE.EXTRACTION_PATTERN_MESSAGE.message;
	isDownloadDisable = true;
	displayedColumns: string[] = [
		'select',
		'extractionPatternName',
		'description'
	];
	dataSource: MatTableDataSource<any>;
	selection = new SelectionModel<any>(true, []);
	definition_mongo: string;
	constructor(
		public dialogRef: MatDialogRef<DialogPatternComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private csvService: CsvService
	) {
		this.dataSource = new MatTableDataSource(data.pattern);
	}

	ngOnDestroy() {
		sessionStorage.removeItem('isModalOpen');
	}

	onClickDownload() {
		this.csvService.downloadCsv(this.selection.selected);
		this.selection.clear();
		this.dialogRef.close();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		const isAllSelected = numSelected === numRows;
		this.isDownloadDisable = !(this.selection.selected.length > 0);
		return isAllSelected;
	}

	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}
		this.isDownloadDisable = !this.isDownloadDisable;

		this.selection.select(...this.dataSource.data);
	}

	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
			row.position + 1
		}`;
	}
}
