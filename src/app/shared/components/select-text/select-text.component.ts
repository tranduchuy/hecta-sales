import { Component, Input, Output, EventEmitter, ViewChild, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.componen';
import { ISelectTextItem } from './i-select-text-item';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'app-select-text',
  templateUrl: './select-text.component.html',
  styleUrls: ['./select-text.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectTextComponent),
    }
  ]
})

export class SelectTextComponent extends BaseComponent implements ControlValueAccessor {

  _selectedItems: ISelectTextItem[] = [];

  @Input() itemsSource: ISelectTextItem[] = [];
  @Input() displayPath = '';
  @Input() valuePath = '';
  @Input() isDisabled = false;

  @Input()
  set selectedItems(values: ISelectTextItem[]) {
    this._selectedItems = values;
  }

  get selectedItems(): ISelectTextItem[] {
    return this._selectedItems;
  }

  @Output() valueChanged = new EventEmitter<any>();
  @Output() textChanged = new EventEmitter<string>();

  @ViewChild('select') select: MatSelect;

  public selected(value: any) {
    this.updateModel();
    this.valueChanged.emit(value);
  }

  onTextChanged(value: string) {
    this.textChanged.emit(value);
  }

  writeValue(obj: any) {
    this.selectedItems = obj; 
  }

  updateModel() {
    this.onModelChange(this.selectedItems);
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
