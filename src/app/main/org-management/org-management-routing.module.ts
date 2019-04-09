import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildListComponent } from './child-list/child-list.component';
import { AddChildComponent } from './add-child/add-child.component';
import { AddChildByEmailComponent } from './add-child-by-email/add-child-by-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';

const routes: Routes = [
  {
    path: 'danh-sach',
    component: ChildListComponent
  },
  {
    path: 'them-tai-khoan-con',
    component: AddChildComponent
  },
  {
    path: 'them-tai-khoan-con-co-san',
    component: AddChildByEmailComponent
  },
  {
    path: 'chuyen-khoan/:id',
    component: MoneyTransferComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgManagementRoutingModule {}
