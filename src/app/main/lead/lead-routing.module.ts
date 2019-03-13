import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {LeadListComponent} from './list/lead-list.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LeadListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule {

}
