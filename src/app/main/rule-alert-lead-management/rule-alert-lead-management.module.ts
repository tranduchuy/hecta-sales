import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleAlertLeadManagementRoutingModule } from './rule-alert-lead-management-routing.module';
import { AddRuleAlertLeadComponent } from './add-rule-alert-lead/add-rule-alert-lead.component';
import { ComboBoxModule } from '../../shared/components/combo-box/combo-box.module';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatLineModule, MatListModule, MatSelectModule } from '@angular/material';
import { RuleAlertLeadListComponent } from './rule-alert-lead-list/rule-alert-lead-list.component';
import { FuseSharedModule } from '../../../@fuse/shared.module';

@NgModule({
  declarations: [AddRuleAlertLeadComponent, RuleAlertLeadListComponent],
  imports: [
    CommonModule,
    RuleAlertLeadManagementRoutingModule,
    ComboBoxModule,
    MatButtonModule,
    MatListModule,
    MatLineModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FuseSharedModule
  ]
})
export class RuleAlertLeadManagementModule {}
