import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToChildList(): void {
    this.router.navigate(['/quan-ly-tai-khoan-doanh-nghiep/danh-sach']);
  }

  navigateToAddChild(): void {
    this.router.navigate(['/quan-ly-tai-khoan-doanh-nghiep/them-tai-khoan-con']);
  }

  navigateToAddChildByEmail(): void {
    this.router.navigate(['/quan-ly-tai-khoan-doanh-nghiep/them-tai-khoan-con-co-san']);
  }

  navigateToMoneyTransfer(): void {
    this.router.navigate(['/quan-ly-tai-khoan-doanh-nghiep/chuyen-khoan']);
  }
}
