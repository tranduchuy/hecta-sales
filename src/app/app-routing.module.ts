import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './main/homepage/homepage.module#HomepageModule'
  },
  {
    path: 'component-list',
    loadChildren: './shared/components/component-list/component-list.module#ComponentListModule'
  },
  {
    path: 'auth',
    loadChildren: './main/auth/auth.module#AuthModule'
  },
  {
    path: 'rule-alert-lead',
    loadChildren: './main/rule-alert-lead-management/rule-alert-lead-management.module#RuleAlertLeadManagementModule'
  },
  {
    path: 'user',
    loadChildren: './main/user-management/user-management.module#UserManagementModule'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
