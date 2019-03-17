import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { LeadService } from '../shared/lead.service';
import { ActivatedRoute } from '@angular/router';
import { LeadResponse } from '../shared/model/LeadResponse';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
  providers: [LeadService]
})
export class LeadDetailsComponent extends PageBaseComponent implements OnInit {

  pageTitle: string;
  lead: LeadResponse;

  constructor(private leadService: LeadService,
              private route: ActivatedRoute) {
    super();
    this.route.params.subscribe(params => {
      console.log(params);
      const leadId = params.id;
      if (leadId) {
        this.leadService.getLeadById(leadId).subscribe(res => {
          console.log(res);
        });
      }
    });
  }

  ngOnInit() {
    this.pageTitle = 'Chi tiết lead mới nhận';
  }

}
