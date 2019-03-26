import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { InputNumberComponent } from './input-number.component';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [InputNumberComponent],
  exports: [InputNumberComponent]
})

export class InputNumberModule {}
