import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceDetailComponent } from './balance-detail/balance-detail.component';

const routes: Routes = [
  {
      path: '',
      component: BalanceDetailComponent,
      data: {
          level: 1
      }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialManagementRoutingModule {}
