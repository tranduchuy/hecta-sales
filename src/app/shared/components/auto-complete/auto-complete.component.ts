import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseComponent } from '../base/base.componen';

const AUTO_COMPLETE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoCompleteComponent),
  multi: true
};

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [AUTO_COMPLETE_VALUE_ACCESSOR]
})
export class AutoCompleteComponent extends BaseComponent implements ControlValueAccessor, OnInit {
  private _itemsSource: any[] = [];
  inputControl = new FormControl();
  filteredOptions: Observable<any[]> = of([]);

  @Input()
  set itemsSource(items: any[]) {
    setTimeout(() => {
      this._itemsSource = items.map(item => {
        return {
          [this.displayPath]: item[this.displayPath],
          [this.valuePath]: item[this.valuePath]
        };
      });

      console.log(this._itemsSource);
      this.inputControl.setValue('');
    });
  }

  get itemsSource(): any[] {
    return this._itemsSource;
  }

  @Input() displayPath = '';
  @Input() valuePath = '';
  @Input() icon = '';

  @Input()
  set value(val: string) {
    const selectedItem = this.getSelectedOption(this.valuePath, val);
    if (selectedItem) {
      this.triggerAutocompleteInput.writeValue(selectedItem);
    }
  }

  get value(): string {
    return this.inputControl.value || '';
  }

  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('matAutoCompleteTrigger', {read: MatAutocompleteTrigger}) triggerAutocompleteInput: MatAutocompleteTrigger;

  constructor() {
    super();
  }

  onLostFocus(): void {
    // this.onModelTouched();
    // super.onLostFocus();
  }

  ngOnInit(): void {
    this.filteredOptions = this.inputControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this._itemsSource.slice())
      );
  }

  onSelectOption(event: MatAutocompleteSelectedEvent): void {
    setTimeout(() => {
      this.inputControl.setValue(event.option.value[this.displayPath]);
      const selectedOption: any = event.option.value;

      if (selectedOption) {
        this.onModelChange(selectedOption[this.valuePath]);
        this.valueChange.emit(selectedOption[this.valuePath]);
        this.writeValue(selectedOption[this.valuePath]);
      } else {
        this.onModelChange(null);
        this.valueChange.emit(null);
        this.writeValue(null);
      }
    });
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
  }

  private onModelTouched = () => {
  }

  displayFn(): Function {
    const displayPath = this.displayPath;

    // cannot use "this" in returned function cause this will be bind as component mat-autocomplete
    return (item?: any): string | undefined => {
      return item ? item[displayPath] : undefined;
    };
  }

  private _filter(name?: string): any[] {
    const filterValue = name.toLowerCase();
    const result = this.itemsSource.filter(option => option[this.displayPath].toLowerCase().indexOf(filterValue) === 0);
    return result;
  }

  private getSelectedOption(field: string, val?: string): any {
    return this.itemsSource.find(item => {
      return item[field] === (val || this.inputControl.value);
    });
  }
}
