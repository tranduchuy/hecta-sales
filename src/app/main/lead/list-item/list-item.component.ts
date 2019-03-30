import { Component, Input } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { LeadResponse } from '../shared/model/LeadResponse';
import { LeadType } from '../shared/lead.type';
import { Router } from '@angular/router';
import { LeadMessages } from '../shared/messages';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { LeadService } from '../shared/lead.service';
import { CurrencyPipe } from '@angular/common';
import {FuseProgressBarService} from "../../../../@fuse/components/progress-bar/progress-bar.service";

@Component({
  selector: 'app-lead-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  providers: [CurrencyPipe]
})
export class ListItemComponent extends PageBaseComponent {
  @Input() lead: LeadResponse;
  @Input() leadType: number;
  LEAD_TYPE = LeadType;

  constructor(private router: Router,
              private leadService: LeadService,
              private currencyPipe: CurrencyPipe,
              private dialog: DialogService,
              private _fuseProgressingBarService: FuseProgressBarService) {
    super();
  }

  onClickByLead(): void {
    const confirmMessage = LeadMessages.CONFIRM_BUY_LEAD + this.currencyPipe.transform(this.lead.leadPrice, 'VND');
    const subConfirmDialog = this.dialog.openConfirm(confirmMessage)

      .subscribe((result: DialogResult) => {
        if (result === DialogResult.OK) {
          const httpSub = this.leadService.buyLead(this.lead._id)
            .subscribe(res => {
              this._fuseProgressingBarService.show();
              if (res.status === HTTP_CODES.SUCCESS) {
                const subDialog = this.dialog.openInfo(res.message)
                  .subscribe((result: DialogResult) => {
                    console.log(result);
                    this.router.navigate(['/khach-hang-tiem-nang'], {queryParams: {type: LeadType.SOLD}});
                  });
                this.subscriptions.push(subDialog);
              } else {
                this.dialog.openWarning(res.message).subscribe().unsubscribe();
              }
              this._fuseProgressingBarService.hide();
            }, err => {
              console.log(err);
            });
          this.subscriptions.push(httpSub);
        } else {
        }
      });
    this.subscriptions.push(subConfirmDialog);
  }

  onClickLeadDetails(): void {
    this.router.navigate(['/khach-hang-tiem-nang/' + this.lead._id]);
  }

  onClickReturnLead(): void {

  }
}
