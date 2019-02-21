import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuleAlertLeadService } from '../shared/service/rule-alert-lead.service';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';

@Component({
  selector: 'app-rule-alert-lead-list',
  templateUrl: './rule-alert-lead-list.component.html',
  styleUrls: ['./rule-alert-lead-list.component.scss']
})
export class RuleAlertLeadListComponent extends PageBaseComponent implements OnInit {

  data: any;

  constructor(private router: Router, private service: RuleAlertLeadService) {
    super();
  }

  ngOnInit(): void {
    const sub = this.service.getRuleAlertLeadList().subscribe((res: any) => {
      this.data = res.data;
    });
    this.subscriptions.push(sub);
  }

  onClickAddRule(): void {
    this.router.navigate(['/rule-alert-lead/add']);
  }
}
