import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogResult } from '../dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './number-dialog.component.html'
})
export class NumberDialogComponent implements OnInit {
  number = '';
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NumberDialogComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.number = this.data.value;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      number: ['', [Validators.required]]
    });
  }

  onClickBtnOk(): void {
    this.dialogRef.close({
      result: DialogResult.OK,
      value: this.form.value.number
    });
  }

  onClickBtnCancel(): void {
    this.dialogRef.close({
      value: DialogResult.CANCEL
    });
  }
}
