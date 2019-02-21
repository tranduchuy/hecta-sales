import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRuleAlertLeadComponent } from './add-rule-alert-lead/add-rule-alert-lead.component';
import { RuleAlertLeadListComponent } from './rule-alert-lead-list/rule-alert-lead-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddRuleAlertLeadComponent
  },
  {
    path: 'list',
    component: RuleAlertLeadListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleAlertLeadManagementRoutingModule {}
