import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { AddEditRentPostComponent } from './add-edit-rent-post/add-edit-rent-post.component';
import {DatePickerModule} from '../../shared/components/date-picker/date-picker.module';
import {InputTextModule} from '../../shared/components/input-text/input-text.module';
import {ComboBoxModule} from '../../shared/components/combo-box/combo-box.module';
import {CheckboxGroupModule} from '../../shared/components/checkbox-group/checkbox-group.module';
import {ImageUploaderModule} from '../../shared/components/image-uploader/image-uploader.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectTextModule} from '../../shared/components/select-text/select-text.module';
import {InputTextareaModule} from '../../shared/components/input-textarea/input-textarea.module';
import {InputNumberModule} from '../../shared/components/input-number/inputNumber.module';
import {ButtonModule} from '../../shared/components/button/button.module';
import {MatDividerModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatTabsModule} from '@angular/material/tabs';
import {CaptchaModule} from '../../shared/components/captcha/captcha.module';
@NgModule({
  declarations: [AddEditRentPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    DatePickerModule,
    InputTextModule,
    ComboBoxModule,
    CheckboxGroupModule,
    ImageUploaderModule,
    SelectTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    CaptchaModule
  ]
})
export class PostModule { }
