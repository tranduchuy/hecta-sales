import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { RadioGroupComponent } from './radio-group.component';

@NgModule({
  declarations: [RadioGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  exports: [RadioGroupComponent]
})

export class RadioGroupModule {

}
