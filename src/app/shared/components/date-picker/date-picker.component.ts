import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BaseComponent } from '../base/base.componen';
import * as _moment from 'moment';

const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MM YYYY'
  }
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    DATE_PICKER_VALUE_ACCESSOR,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class DatePickerComponent extends BaseComponent implements OnInit, ControlValueAccessor {
  inputControl = new FormControl();
  inputDate: Date | null;
  @Input() minDay: Date;
  @Input() maxDay: Date;

  @Input()
  set value(val: Date | null) {
    this.inputDate = val;
    if (val) {
      this.inputControl.setValue(_moment(val));
    }
  }

  get value(): Date | null {
    return this.inputDate || null;
  }

  @Output() valueChange = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.inputControl.valueChanges
      .pipe(
        filter(value => value),
        map(value => value._d.getTime()),
        distinctUntilChanged()
      )
      .subscribe((value: number) => {
        this.onChangeInputDate(new Date(value));
      });
  }

  onChangeInputDate(newDate: Date): void {
    this.writeValue(newDate);
    this.onModelTouched();
    this.onModelChange(newDate);
  }

  onLostFocus(): void {
    this.onModelTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  private onModelChange = (_: any) => {};

  private onModelTouched = () => {};
}
