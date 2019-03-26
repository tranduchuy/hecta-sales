import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectTextComponent } from './select-text.component';
import {MatFormFieldModule, MatIconModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [SelectTextComponent],
  exports: [SelectTextComponent]
})

export class SelectTextModule {}
