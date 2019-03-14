import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const appRoutes: Route[] = [
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
    path: 'khach-hang-tiem-nang',
    loadChildren: './main/lead/lead.module#LeadModule'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
