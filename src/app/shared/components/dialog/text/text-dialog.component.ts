import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogResult } from '../dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html'
})
export class TextDialogComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TextDialogComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      text: ['', [Validators.required, Validators.minLength(50)]]
    })
  }

  onClickBtnOk() {
    this.dialogRef.close(this.form.value);
  }

  onClickBtnCancel() {
    this.dialogRef.close(DialogResult.CANCEL);
  }
}
