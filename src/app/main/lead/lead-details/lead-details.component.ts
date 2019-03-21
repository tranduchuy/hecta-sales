import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { LeadService } from '../shared/lead.service';
import { ActivatedRoute } from '@angular/router';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { LeadDetails } from '../shared/model/lead-details';
import { LeadType } from '../shared/lead.type';
import { LeadMessages } from '../shared/messages';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
  providers: [LeadService]
})
export class LeadDetailsComponent extends PageBaseComponent implements OnInit {
  pageTitle = '';
  lead: LeadDetails;
  LEAD_TYPE = LeadType;
  MESSAGES = LeadMessages;

  constructor(private leadService: LeadService,
              private dialog: DialogService,
              private route: ActivatedRoute) {
    super();
    const subParams = this.route.params.subscribe(params => {

      console.log(params);

      const leadId = params.id;
      if (leadId) {
        const subHttp = this.leadService.getLeadById(leadId)
          .subscribe(res => {
            if (res.status === HTTP_CODES.SUCCESS) {
              this.lead = res.data as LeadDetails;
              this.leadService.convertTimeToDownPriceToMMss([this.lead]);
              this.initPageTitle();
            } else {
              const subDialog = this.dialog.openWarning(res.message)
                .subscribe((result: DialogResult) => {});
              this.subscriptions.push(subDialog);
            }
          });
        this.subscriptions.push(subHttp);
      }
    });

    this.subscriptions.push(subParams);
  }

  ngOnInit(): void {
  }

  buyLead(): void {
  }

  returnLead(): void {
  }

  finishLead(): void {
  }

  private initPageTitle(): void {
    if (this.lead.status === LeadType.SOLD) {
      this.pageTitle = 'Chi tiết lead mới nhận';
    } else {
      this.pageTitle = 'Chi tiết lead';
    }
  }
}
