import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent
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
export class HomepageRoutingModule { }
