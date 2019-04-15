import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildListComponent } from './child-list/child-list.component';
import { AddChildComponent } from './add-child/add-child.component';
import { AddChildByEmailComponent } from './add-child-by-email/add-child-by-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { OrgManagementGuard } from '../../shared/services/guard/org-management.guard';

const routes: Routes = [
  {
    path: 'danh-sach',
    component: ChildListComponent,
    canActivate: [OrgManagementGuard]
  },
  {
    path: 'them-tai-khoan-con',
    component: AddChildComponent,
    canActivate: [OrgManagementGuard]
  },
  {
    path: 'them-tai-khoan-con-co-san',
    component: AddChildByEmailComponent,
    canActivate: [OrgManagementGuard]
  },
  {
    path: 'chuyen-khoan/:id',
    component: MoneyTransferComponent,
    canActivate: [OrgManagementGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [OrgManagementGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrgManagementGuard]
})
export class OrgManagementRoutingModule {}
