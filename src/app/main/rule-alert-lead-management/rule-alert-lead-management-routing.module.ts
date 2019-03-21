import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRuleAlertLeadComponent } from './add-rule-alert-lead/add-rule-alert-lead.component';
import { RuleAlertLeadListComponent } from './rule-alert-lead-list/rule-alert-lead-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddRuleAlertLeadComponent,
    data: {
      level: 2
    }
  }, {
    path: 'update/:id',
    component: AddRuleAlertLeadComponent,
    data: {
      level: 2
    }
  },
  {
    path: 'list',
    component: RuleAlertLeadListComponent,
    data: {
      level: 1
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleAlertLeadManagementRoutingModule {}
