import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { environment } from 'environments/environment.prod';

const appDev: Routes = [
  {
    path: 'component-list',
    loadChildren: './shared/components/component-list/component-list.module#ComponentListModule',
  }
]

const appRoutes: Routes = [
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
    redirectTo: '/auth/login'
  },
];

if(!environment.production){
  appRoutes.unshift(...appDev);
}

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
