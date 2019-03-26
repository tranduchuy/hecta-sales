import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CaptchaComponent } from './captcha.component';

@NgModule({
  declarations: [CaptchaComponent],
  exports: [CaptchaComponent],
  imports: [CommonModule]
})

export class CaptchaModule {

}
