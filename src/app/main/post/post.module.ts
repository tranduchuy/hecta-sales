import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { AddEditRentPostComponent } from './add-edit-rent-post/add-edit-rent-post.component';
import {DatePickerModule} from '../../shared/components/date-picker/date-picker.module';
import {InputTextModule} from '../../shared/components/input-text/input-text.module';
import {ComboBoxModule} from '../../shared/components/combo-box/combo-box.module';
import {CheckboxGroupModule} from '../../shared/components/checkbox-group/checkbox-group.module';
import {ImageUploaderModule} from '../../shared/components/image-uploader/imageUploader.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectTextModule} from '../../shared/components/select-text/select-text.module';

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
    SelectTextModule
  ]
})
export class PostModule { }
