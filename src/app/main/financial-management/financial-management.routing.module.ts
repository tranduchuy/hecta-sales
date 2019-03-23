import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BalanceDetailComponent} from './balance-detail/balance-detail.component';
import { FinancialListComponent } from './financial-list/financial-list.component';
import { HistoryTransactionComponent } from './history-transaction/history-transaction.component';
import { RechargeComponent } from './recharge/recharge.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialListComponent,
    data: {
      level: 1
    }
  },
  {
    path: 'giao-dich',
    component: HistoryTransactionComponent,
    data: {
      level: 2
    }
  },
  {
    path: 'nap-tien',
    component: RechargeComponent,
    data: {
      level: 2
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialManagementRoutingModule {
}
