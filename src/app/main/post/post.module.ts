import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { AddEditRentPostComponent } from './add-edit-rent-post/add-edit-rent-post.component';

@NgModule({
  declarations: [AddEditRentPostComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
