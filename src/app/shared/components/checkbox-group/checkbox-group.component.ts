import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { BaseComponent } from '../base/base.componen';

const CHECKBOX_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [CHECKBOX_GROUP_VALUE_ACCESSOR]
})
export class CheckboxGroupComponent extends BaseComponent implements ControlValueAccessor {
  selectedObj: any = {};
  selectedValues: any[] = [];
  @Input() direction = 'row'; // row or column
  @Input() itemsSource: any[] = [];
  @Input() displayPath = '';
  @Input() valuePath = '';
  @Input()
  set value(values: any[]) {
    values.forEach(v => this.selectedObj[v] = true);
  }

  get value(): any[] {
    return this.selectedValues;
  }

  @Output() valueChange = new EventEmitter<any>();


  constructor() {
    super();
  }


  onSelectCheckbox(event: MatCheckboxChange): void {
    const value = event.source.value;
    this.selectedObj[value] = event.checked;
    const selectedValues = this.extractSelectedCheckboxValues();
    this.onModelTouched();
    this.onModelChange(selectedValues);
    this.valueChange.emit(selectedValues);
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

  private extractSelectedCheckboxValues(): string[] {
    const results = [];
    for (const key in this.selectedObj) {
      if (this.selectedObj[key] === true) {
        results.push(key);
      }
    }

    return results;
  }

}
