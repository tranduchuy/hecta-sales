import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { MatTabChangeEvent } from '@angular/material/typings/tabs';

enum LEAD_LIST_TABS {
  NEW,
  HAVE_JUST_RECEIVED,
  FINISHED,
  RETURNING
}

interface ITabConfig {
  header: string;
  type: LEAD_LIST_TABS;
  filterCondition: {
    [key: string]: any
  };
}

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent extends PageBaseComponent implements OnInit {
  selectedTab: { index: number; tab: ITabConfig | null } = {
    index: -1,
    tab: null
  };

  tabs = [
    {
      header: 'Mới',
      type: LEAD_LIST_TABS.NEW,
      filterCondition: {},
    },
    {
      header: 'Mới nhận',
      type: LEAD_LIST_TABS.HAVE_JUST_RECEIVED,
      filterCondition: {},
    },
    {
      header: 'Hoàn thành',
      type: LEAD_LIST_TABS.FINISHED,
      filterCondition: {},
    },
    {
      header: 'Đang trả lead',
      type: LEAD_LIST_TABS.RETURNING,
      filterCondition: {},
    }
  ];

  leadList = {
    limit: 20,
    page: 0,
    totalItems: 0,
    itemsSource: []
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._loadLeads();
  }

  onChangedTab(event: MatTabChangeEvent): void {
    console.log(event);
  }

  onFinishedAnimation(): void {
    console.log('finished animation');
  }

  private _loadLeads(): void {
  }

  private _generateParamGetLeads(): any {}
}
