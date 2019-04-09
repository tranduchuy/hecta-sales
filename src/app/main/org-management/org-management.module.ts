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
import { ChildItemComponent } from './child-item/child-item.component';

@NgModule({
  declarations: [
    ChildListComponent,
    AddChildComponent,
    AddChildByEmailComponent,
    DashboardComponent,
    MoneyTransferComponent,
    ChildStatusPipe,
    ChildItemComponent
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
    MatFormFieldModule
  ],
  exports: [
    ChildStatusPipe
  ],
  providers: [OrgManagementService]
})
export class OrgManagementModule {}
