import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { AutoCompleteComponent } from './auto-complete.component';

@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [AutoCompleteComponent]
})
export class AutoCompleteModule {

}