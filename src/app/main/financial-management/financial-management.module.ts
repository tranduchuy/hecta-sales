import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComboBoxModule} from '../../shared/components/combo-box/combo-box.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatLineModule,
  MatListModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {InputTextModule} from 'app/shared/components/input-text/input-text.module';
import {InputPasswordModule} from 'app/shared/components/input-password/input-password.module';
import {DatePickerModule} from 'app/shared/components/date-picker/date-picker.module';
import {RadioGroupModule} from 'app/shared/components/radio-group/radio-group.module';
import {FinancialManagementRoutingModule} from './financial-management.routing.module';
import {BalanceDetailComponent} from './balance-detail/balance-detail.component';
import { FinancialListComponent } from './financial-list/financial-list.component';
import { HistoryTransactionComponent } from './history-transaction/history-transaction.component';
import { RechargeComponent } from './recharge/recharge.component';


@NgModule({
  declarations: [BalanceDetailComponent, FinancialListComponent, HistoryTransactionComponent, RechargeComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    FinancialManagementRoutingModule,
    ComboBoxModule,
    InputTextModule,
    InputPasswordModule,
    DatePickerModule,
    RadioGroupModule,
    MatButtonModule,
    MatListModule,
    MatLineModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    FuseSharedModule
  ]
})
export class FinancialManagementModule {
}
