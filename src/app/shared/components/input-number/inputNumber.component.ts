import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base/base.componen';

const INPUT_NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumberComponent),
  multi: true
};

@Component({
  templateUrl: './inputNumber.component.html',
  selector: 'app-input-number',
  styleUrls: ['./inputNumber.component.scss'],
  providers: [INPUT_NUMBER_VALUE_ACCESSOR]
})

export class InputNumberComponent extends BaseComponent implements ControlValueAccessor {
  private _decimal = 0;
  private _target;
  _value = '';
  _mask = '0*';

  @Input() placeholder = '';

  @Input()
  set value(v: any) {
    this._value = v;
  }

  get value(): any {
    return this._value;
  }

  @Input()
  set decimal(value: number) {
    this._decimal = value;
  }

  @Output() valueChanged = new EventEmitter<number>();
  @Output() pressEnter = new EventEmitter<any>();
  @Output() lostFocus = new EventEmitter<any>();

  onChangeValue() {
    this.updateModel();
    this.valueChanged.emit(this.value);
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

  updateModel() {
    this.onModelChange(this.value);
  }

  onGotBlur() {
    this.onModelTouched();
    this.onModelChange(this.value);
    this.lostFocus.emit();
  }

  private onModelChange = (_: any) => {};

  private onModelTouched = () => {};
}
