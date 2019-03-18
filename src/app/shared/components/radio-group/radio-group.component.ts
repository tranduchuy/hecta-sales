import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { BaseComponent } from '../base/base.componen';

const RADIO_GROUP__VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true
};

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [RADIO_GROUP__VALUE_ACCESSOR]
})
export class RadioGroupComponent extends BaseComponent implements ControlValueAccessor {
  selectedValue: any = '';
  @Input() direction = 'row'; // row or column
  @Input() itemsSource: any[] = [];
  @Input() displayPath = '';
  @Input() valuePath = '';

  @Input()
  set value(val: any) {
    const item: any = this.findItemByValue(val);
    if (item) {
      this.selectedValue = val;
    }
  }

  get value(): any {
    return this.findItemByValue(this.selectedValue);
  }

  @Output() valueChange = new EventEmitter<any>();

  constructor() {
    super();
  }

  onSelectRadio(event: MatRadioChange): void {
    this.onModelChange(this.selectedValue);
    this.onModelTouched();
    this.valueChange.emit(this.findItemByValue(this.selectedValue));
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

  private onModelChange = (_: any) => {
  };

  private onModelTouched = () => {
  };

  private findItemByValue(value: any): any {
    return this.itemsSource.find(i => i[this.valuePath] === value);
  }
}
