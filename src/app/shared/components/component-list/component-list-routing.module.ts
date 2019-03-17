import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ComponentListComponent } from './component-list.component';

const routes: Route[] = [{
  path: '',
  component: ComponentListComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ComponentListRoutingModule {}
