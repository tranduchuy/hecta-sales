import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuleAlertLeadService } from '../shared/service/rule-alert-lead.service';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { RuleAlertLeadResponse } from '../shared/model/rule-alert-lead-response';

@Component({
  selector: 'app-rule-alert-lead-list',
  templateUrl: './rule-alert-lead-list.component.html',
  styleUrls: ['./rule-alert-lead-list.component.scss']
})
export class RuleAlertLeadListComponent extends PageBaseComponent implements OnInit {

  ruleAlertLeadDetailsList: any[];

  constructor(private router: Router, private service: RuleAlertLeadService,
              private dialog: DialogService) {
    super();
  }

  ngOnInit(): void {
    const sub = this.service.getRuleAlertLeadList().subscribe((res: any) => {
      this.ruleAlertLeadDetailsList = res.data.entries
        .map((entry: RuleAlertLeadResponse) => this.service.getRuleAlertLeadLiteDetails(entry));
    });
    this.subscriptions.push(sub);
  }

  onClickAddRule(): void {
    this.router.navigate(['/rule-alert-lead/add']);
  }

  onClickEditRule(rule?: any): void {
    console.log(rule);
    this.router.navigate(['/rule-alert-lead/update/' + rule.id]);
  }

  onClickDeleteRule(rule?: any): void {
    const self = this;
    const confirmMessage = `Bạn có chắc chắn muốn xóa nhận lead dự án ${rule.projectName}, ${rule.districtName}, ${rule.cityName}?`;
    const subDialog = this.dialog.openConfirm(confirmMessage)
      .subscribe((result: DialogResult) => {
        if (result === DialogResult.OK) {
          const subHttp = self.service.deleteRuleAlertLead(rule.id)
            .subscribe((res: any) => {
              if (res.status === 1) {
                self.ngOnInit();
                const successMessage = `Bạn đã xóa nhận lead dự án ${rule.projectName}, ${rule.districtName}, ${rule.cityName} thành công!`;
                self.dialog.openInfo(successMessage).subscribe().unsubscribe();
              }
            });
          self.subscriptions.push(subHttp);
        }
      });
    this.subscriptions.push(subDialog);
  }
}
