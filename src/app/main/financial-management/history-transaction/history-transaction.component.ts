import { Component, OnInit } from '@angular/core';
import { FinancialService } from '../shared/service/financial.service';
import { HTTP_CODES } from 'app/shared/constants/http-code.constant';
import { DialogService } from 'app/shared/components/dialog/dialog.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { Transactions } from '../shared/model/history-transactions.model';
@Component({
  selector: 'app-history-transaction',
  templateUrl: './history-transaction.component.html',
  styleUrls: ['./history-transaction.component.scss']
})
export class HistoryTransactionComponent extends PageBaseComponent implements OnInit {

  data: Transactions[] = [];
  itemCount: number;
  currentPage: number = 1;

  displayedColumns: string[] = ['index', 'date', 'type', 'info', 'balance', 'cash', 'finalBalance', 'note'];

  constructor(
    private _financialService: FinancialService,
    private _dialog: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.getTransactions(1);
  }

  getTransactions(currentPage): void {
    this._financialService.getTransactions(currentPage).subscribe(
      (res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.data = res.data.items;
          this.itemCount = res.data.itemCount;
          console.log(this.data);
        }
        else {
          this._dialog.openInfo('Không lấy được dữ liệu!')
            .subscribe().unsubscribe();
        }
      }
    )
  }

  onLoadMoreTransactions(): void{
    this.currentPage = this.currentPage + 1;

    const sub = this._financialService.getTransactions(this.currentPage).subscribe(
      (res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          const newData = res.data.items;
          this.data = this.data.concat(newData);
        }
        else {
          this._dialog.openInfo('Không lấy được dữ liệu!')
            .subscribe().unsubscribe();
        }
      })
      this.subscriptions.push(sub);
    }

  updatePage(event) {
    console.log(event);
    this.getTransactions(event.pageIndex + 1);
    this.currentPage = event.pageIndex + 1;
  }
}
