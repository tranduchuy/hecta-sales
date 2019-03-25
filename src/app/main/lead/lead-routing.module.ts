import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LeadListComponent } from './list/lead-list.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';

const routes: Route[] = [
  {
    path: '',
    component: LeadListComponent,
    pathMatch: 'full',
    data: {
      level: 1
    }
  },
  {
    path: ':id',
    component: LeadDetailsComponent,
    data: {
      level: 2
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule {

}
