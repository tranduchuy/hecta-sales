import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'me',
    component: UserListComponent
  },
  {
    path: 'update',
    component: UserDetailComponent
  },
  {
    path: 'update-password',
    component: UserUpdatePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
