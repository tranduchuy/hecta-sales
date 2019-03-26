import {Component, EventEmitter, Input, Output, forwardRef, ViewChild, ElementRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives/control_value_accessor';
import {MatLabel} from '@angular/material';
import {InputTextBaseComponent} from '../base/input-base.component';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextareaComponent),
    }
  ]
})

export class InputTextareaComponent extends InputTextBaseComponent implements ControlValueAccessor {
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

  constructor(protected el: ElementRef) {
    super();
  }

  ngOnInit(): void {
  }

  onFocus(event: any): void {
    super.onFocus(event);

    const input = this.el.nativeElement.querySelector('input');
    if (!input) {
      return;
    }

    this.blurEventListener = this.onBlur.bind(this);
    input.addEventListener('blur', this.blurEventListener);
  }

  private onInputBlur(): void {

  }

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

  onLostFocus(): void {
    super.onLostFocus();
    this.onModelTouched();
  }

  private onModelChange = (_: any) => {
  }

  private onModelTouched = () => {
  }

  private onBlur(): void {
    this.onLostFocus();
  }

  private blurEventListener: any = () => {
  }
}
