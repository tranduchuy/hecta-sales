import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { InputPasswordComponent } from './input-password.component';

@NgModule({
  declarations: [
    InputPasswordComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    InputPasswordComponent
  ],
  providers: []
})
export class InputPasswordModule {

}
