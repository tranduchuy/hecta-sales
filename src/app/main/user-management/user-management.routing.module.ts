import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'me',
    component: UserListComponent,
    data: {
      level: 1
    }
  },
  {
    path: 'update',
    component: UserDetailComponent,
    data: {
      level: 2
    }
  },
  {
    path: 'update-password',
    component: UserUpdatePasswordComponent,
    data: {
      level: 2
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
