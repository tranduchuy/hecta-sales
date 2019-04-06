import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {AddEditRentPostComponent} from './add-edit-rent-post/add-edit-rent-post.component';
import { ListSalePostComponent } from './list-sale-post/list-sale-post.component';

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
  {
    path: 'list-sale-post',
    component: ListSalePostComponent
  }
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
