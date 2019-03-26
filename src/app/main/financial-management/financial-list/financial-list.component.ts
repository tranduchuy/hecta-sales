import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-list',
  templateUrl: './financial-list.component.html',
  styleUrls: ['./financial-list.component.scss']
})
export class FinancialListComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  navigateToTransactionHistory(): void
  {
    this._router.navigate(['/quan-ly-tai-chinh/giao-dich'])
  }

  navigateToBusinessAccount(): void
  {
    // this._router.navigate(['/quan-ly-tai-chinh/giao-dich'])
  }

  navigateToRechargeAccount(): void
  {
    this._router.navigate(['/quan-ly-tai-chinh/nap-tien'])
  }

}
