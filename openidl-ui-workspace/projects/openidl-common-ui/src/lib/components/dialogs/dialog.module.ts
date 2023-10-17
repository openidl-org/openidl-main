import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { BaseDialogComponent } from './base-dialog.component/base-dialog.component';
import { DialogConfirmationComponent } from './dialog-confirmation.component/dialog-confirmation.component';
import { DialogSessionComponent } from './dialog-session.component/dialog-session.component';
import { DialogDeleteDataComponent } from './dialog-delete-data.component/dialog-delete-data.component';
import { DialogForumComponent } from './dialog-forum.component/dialog-forum.component';
import { DialogPatternComponent } from './dialog-pattern.component/dialog-pattern.component';
import { DialogDateComponent } from './dialog-date.component/dialog-date.component';
import { DialogPatternDetailsComponent } from './dialog-pattern-details.component/dialog-pattern-details.component';

@NgModule({
	imports: [CommonModule, FormsModule, MaterialModule],
	declarations: [
		DialogSessionComponent,
		DialogDeleteDataComponent,
		DialogConfirmationComponent,
		DialogForumComponent,
		DialogPatternComponent,
		DialogDateComponent,
		DialogPatternDetailsComponent,
		BaseDialogComponent
	],
	exports: [
		MaterialModule,
		DialogSessionComponent,
		DialogDeleteDataComponent,
		DialogConfirmationComponent,
		DialogForumComponent,
		DialogPatternComponent,
		DialogDateComponent,
		DialogPatternDetailsComponent,
		BaseDialogComponent
	],
	providers: []
})
export class DialogModule {}
