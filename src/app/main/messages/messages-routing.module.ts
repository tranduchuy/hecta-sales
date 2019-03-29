import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MessagesComponent
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
export class MessagesRoutingModule { }
