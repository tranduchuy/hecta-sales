import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {AddEditRentPostComponent} from './add-edit-rent-post/add-edit-rent-post.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: AddEditRentPostComponent
  },
  {
    path: 'post-buy-article-modify',
    component: AddEditRentPostComponent
  },
  {
    path: 'post-buy-article',
    component: AddEditRentPostComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PostRoutingModule { }
