import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatFormFieldModule } from '@angular/material';
import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  declarations: [CheckboxGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  exports: [CheckboxGroupComponent]
})
export class CheckboxGroupModule {

}