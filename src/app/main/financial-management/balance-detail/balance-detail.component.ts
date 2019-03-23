import {Component, OnInit} from '@angular/core';
import {FinancialService} from '../shared/service/financial.service';

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.scss']
})
export class BalanceDetailComponent implements OnInit {

  balance: Object = {};

  constructor(private _financialService: FinancialService) {
  }

  ngOnInit() {
    this._financialService.getBalance().subscribe(
      (res: any) => {
        this.balance = res.data.user.balance;
        console.log(this.balance)
      }
    )
  }

}
