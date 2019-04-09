import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgManagementService } from '../shared/service/org-management-service';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss']
})
export class MoneyTransferComponent extends PageBaseComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private orgService: OrgManagementService) {
    super();
    this.route.params.subscribe(params => {
      console.log(params.id);
      // this.orgService.
    });
  }

  ngOnInit() {
  }

}
