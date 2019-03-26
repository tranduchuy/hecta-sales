import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [ButtonComponent]
})

export class ButtonModule {}
