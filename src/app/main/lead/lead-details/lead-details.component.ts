import { Component, OnInit, Input } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { LeadService } from '../shared/lead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { LeadDetails } from '../shared/model/lead-details';
import { LeadType } from '../shared/lead.type';
import { LeadMessages } from '../shared/messages';
import { CurrencyPipe, Location } from '@angular/common';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
  providers: [LeadService, CurrencyPipe]
})
export class LeadDetailsComponent extends PageBaseComponent implements OnInit {
  pageTitle = '';
  lead: LeadDetails;
  LEAD_TYPE = LeadType;
  MESSAGES = LeadMessages;

  reason;

  constructor(private leadService: LeadService,
              private dialog: DialogService,
              private router: Router,
              private location: Location,
              private fuseProgressBarService: FuseProgressBarService,
              private currencyPipe: CurrencyPipe,
              private route: ActivatedRoute) {
    super();
    const subParams = this.route.params.subscribe(params => {
      const leadId = params.id;
      if (leadId) {
        this.fuseProgressBarService.show();
        const subHttp = this.leadService.getLeadById(leadId)
          .subscribe(res => {
            this.fuseProgressBarService.hide();

            if (res.status === HTTP_CODES.SUCCESS) {
              this.lead = res.data as LeadDetails;
              this.leadService.convertTimeToDownPriceToMMss([this.lead]);
              this.initPageTitle();
            } else {
              const subDialog = this.dialog.openWarning(res.message)
                .subscribe((result: DialogResult) => {
                  this.location.back();
                });
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
    const confirmMessage = LeadMessages.CONFIRM_BUY_LEAD + this.currencyPipe.transform(this.lead.leadPrice, 'VND');
    const subConfirmDialog = this.dialog.openConfirm(confirmMessage)
      .subscribe((result: DialogResult) => {
        if (result === DialogResult.OK) {
          this.fuseProgressBarService.show();

          const httpSub = this.leadService.buyLead(this.lead._id)
            .subscribe(res => {
              this.fuseProgressBarService.hide();

              if (res.status === HTTP_CODES.SUCCESS) {
                const subDialog = this.dialog.openInfo(res.message)
                  .subscribe(() => {
                    this.router.navigate(['/khach-hang-tiem-nang'], {queryParams: {type: LeadType.SOLD}});
                  });
                this.subscriptions.push(subDialog);
              } else {
                this.dialog.openWarning(res.message).subscribe().unsubscribe();
              }
            });
          this.subscriptions.push(httpSub);
        }
      });
    this.subscriptions.push(subConfirmDialog);
  }

  returnLead(): void {
    const sub = this.dialog.openText('Nhập lý do của bạn').subscribe(
      (res: any) => {
        if(res === 1 || res === undefined || !res){
          //nothing to do
        }
        else{
          const sub = this.dialog.openConfirm('Bạn có chắc chưa?').subscribe(
            (res: any)=>{
              if(res === DialogResult.OK){
                this.fuseProgressBarService.show();
                const data = {
                  leadId: this.lead._id,
                  reason: res
                }
                this.leadService.returnLead(data).subscribe(
                  (res: any) => {
                    console.log(res);
                  }
                );
                  setTimeout(() => {
                    this.router.navigate(['/khach-hang-tiem-nang'], {queryParams: {type: LeadType.RETURNING}});
                  }, 200);
              }
            }
          )
          this.subscriptions.push(sub);
        }
      }
    );
    this.subscriptions.push(sub);
    this.fuseProgressBarService.hide();
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
