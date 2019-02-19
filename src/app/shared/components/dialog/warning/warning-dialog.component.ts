import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogResult } from '../dialog.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html'
})
export class WarningDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClickBtnOk() {
    this.dialogRef.close(DialogResult.OK);
  }

  onClickBtnCancel() {
    this.dialogRef.close(DialogResult.CANCEL);
  }
}
