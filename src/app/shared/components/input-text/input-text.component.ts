import { Component, forwardRef, OnDestroy, EventEmitter, Output, Input, ViewChild, OnInit } from '@angular/core';
import { InputTextBaseComponent } from '../input-base/input-base.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatLabel } from '@angular/material';

const INPUT_TEXT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTextComponent),
  multi: true
};

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [INPUT_TEXT_VALUE_ACCESSOR]
})
export class InputTextComponent extends InputTextBaseComponent implements ControlValueAccessor, OnDestroy, OnInit {
  innerValue = '';
  @Input()
  set value(val: any) {
    this.innerValue = val;
  }

  get value(): any {
    return this.innerValue;
  }

  @Output() valueChanged = new EventEmitter<string>();

  @ViewChild('label') label: MatLabel;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.label);
  }

  ngOnDestroy(): void {}

  onInputChange(): void {
    this.writeValue(this.innerValue);
    this.onModelChange(this.innerValue);
    this.valueChanged.emit(this.innerValue);
  }

  writeValue(obj: any): void {
    this.value = obj;
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
