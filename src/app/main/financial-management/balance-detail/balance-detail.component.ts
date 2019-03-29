import {Component, OnInit} from '@angular/core';
import {FinancialService} from '../shared/service/financial.service';
import {FuseProgressBarService} from "../../../../@fuse/components/progress-bar/progress-bar.service";
import {PageBaseComponent} from "../../../shared/components/base/page-base.component";

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.scss']
})
export class BalanceDetailComponent extends PageBaseComponent implements OnInit {

  balance: any;

  constructor(
    private _financialService: FinancialService,
    private _fuseProgressBarService: FuseProgressBarService
  ) {
    super();
  }

  ngOnInit() {
    this._fuseProgressBarService.show();
    const sub = this._financialService.getBalance().subscribe(
      (res: any) => {
        this.balance = res.data.user.balance;
      }
    );
    this.subscriptions.push(sub);
    this._fuseProgressBarService.hide();
  }

}
