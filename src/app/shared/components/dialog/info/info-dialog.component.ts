import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogResult } from '../dialog.service';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClickBtnOk() {
    this.dialogRef.close(DialogResult.OK);
  }
}
