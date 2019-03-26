import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment as environmentDev } from 'environments/environment';

const appDev: Routes = [
  {
    path: 'component-list',
    loadChildren: './shared/components/component-list/component-list.module#ComponentListModule',
  }
];

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './main/homepage/homepage.module#HomepageModule'
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
    path: 'post',
    loadChildren: './main/post/post.module#PostModule'
  },
  {
    path: 'khach-hang-tiem-nang',
    loadChildren: './main/lead/lead.module#LeadModule'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

if (!environmentDev.production) {
  appRoutes.unshift(...appDev);
}

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
