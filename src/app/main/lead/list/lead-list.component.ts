import {Component, OnInit} from '@angular/core';
import {PageBaseComponent} from '../../../shared/components/base/page-base.component';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent extends PageBaseComponent implements OnInit {
  tabs = [
    {
      header: 'Mới'
    },
    {
      header: 'Mới nhận'
    },
    {
      header: 'Hoàn thành'
    },
    {
      header: 'Đang trả lead'
    }
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._loadLeads();
  }

  private _loadLeads() {}
}
