import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text.component';
import { MatInputModule, MatFormFieldModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputTextComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    InputTextComponent
  ],
  providers: [
    
  ]
})
export class InputTextModule {
  
}
