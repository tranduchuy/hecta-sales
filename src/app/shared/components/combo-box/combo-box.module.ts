import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatSelectModule } from '@angular/material';
import { ComboBoxComponent } from './combo-box.component';

@NgModule({
  declarations: [ComboBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [ComboBoxComponent]
})
export class ComboBoxModule {

}