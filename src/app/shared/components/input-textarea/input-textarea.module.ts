import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextareaComponent } from './input-textarea.component';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  declarations: [
    InputTextareaComponent
  ],
  exports: [
    InputTextareaComponent
  ]
})
export class InputTextareaModule {}
