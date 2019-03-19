import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base/base.componen';

const COMBO_BOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ComboBoxComponent),
  multi: true
};

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  providers: [COMBO_BOX_VALUE_ACCESSOR]
})
export class ComboBoxComponent extends BaseComponent implements ControlValueAccessor {
  selectedValue = '';
  @Input() itemsSource: any[] = [];
  @Input() displayPath = '';
  @Input() valuePath = '';
  @Input() icon = '';

  @Input()
  set value(val: any) {
    this.selectedValue = val;
  }

  get value(): any {
    return this.selectedValue;
  }

  @Output() valueChange = new EventEmitter();

  constructor() {
    super();
  }

  onSelectOption(event: any): void {
    console.log('event', event);
    this.onModelTouched();
    this.onModelChange(this.selectedValue);
    this.valueChange.emit(this.selectedValue);
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
}
