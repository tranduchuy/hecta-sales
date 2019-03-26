import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StrService } from '../../services/helper/str.service';
import { ImageUploaderComponent } from './image-uploader.component';

@NgModule({
  declarations: [ImageUploaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ImageUploaderComponent
  ]
})

export class ImageUploaderModule {

}
