import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgManagementRoutingModule } from './org-management-routing.module';
import { ChildListComponent } from './child-list/child-list.component';
import { AddChildComponent } from './add-child/add-child.component';
import { AddChildByEmailComponent } from './add-child-by-email/add-child-by-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { OrgManagementService } from './shared/service/org-management-service';
import { ChildStatusPipe } from './shared/pipe/child-status.pipe';
import { InputTextModule } from '../../shared/components/input-text/input-text.module';
import { InputNumberModule } from '../../shared/components/input-number/input-number.module';
import { DatePickerModule } from '../../shared/components/date-picker/date-picker.module';
import { InputPasswordModule } from '../../shared/components/input-password/input-password.module';
import { RadioGroupModule } from '../../shared/components/radio-group/radio-group.module';
import { ComboBoxModule } from '../../shared/components/combo-box/combo-box.module';

@NgModule({
  declarations: [
    ChildListComponent,
    AddChildComponent,
    AddChildByEmailComponent,
    DashboardComponent,
    MoneyTransferComponent,
    ChildStatusPipe
  ],
  imports: [
    CommonModule,
    OrgManagementRoutingModule,
    FuseSharedModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    InputTextModule,
    InputNumberModule,
    MatFormFieldModule,
    DatePickerModule,
    InputPasswordModule,
    RadioGroupModule,
    ComboBoxModule
  ],
  exports: [
    ChildStatusPipe
  ],
  providers: [OrgManagementService]
})
export class OrgManagementModule {}
