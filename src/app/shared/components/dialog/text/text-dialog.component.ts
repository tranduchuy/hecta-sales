import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogResult } from '../dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html'
})
export class TextDialogComponent implements OnInit {
  text = '';
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TextDialogComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      text: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  onClickBtnOk(): void {
    this.dialogRef.close({
      result: DialogResult.OK,
      reason: this.form.value.text.trim()
    });
  }

  onClickBtnCancel(): void {
    this.dialogRef.close({
      result: DialogResult.CANCEL
    });
  }
}
