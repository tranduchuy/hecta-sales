import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { MatTabChangeEvent } from '@angular/material/typings/tabs';
import { LeadService } from '../shared/lead.service';
import { LeadType } from '../shared/lead.type';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { DialogService } from '../../../shared/components/dialog/dialog.service';
import { ListLeadResponse } from '../shared/model/LeadListResponse';
import { ActivatedRoute } from '@angular/router';

interface ITabConfig {
  header: string;
  type: number;
  filterCondition: {
    [key: string]: any
  };
}

interface QueryParams {
  page: number;
  limit: number;
  status: number;
}

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
  providers: [LeadService]
})
export class LeadListComponent extends PageBaseComponent implements OnInit {
  selectedTab: { index: number; tab: ITabConfig | null } = {
    index: -1,
    tab: null
  };

  tabs = [
    {
      header: 'Mới',
      type: LeadType.NEW,
      filterCondition: {}
    },
    {
      header: 'Mới nhận',
      type: LeadType.SOLD,
      filterCondition: {}
    },
    {
      header: 'Hoàn thành',
      type: LeadType.FINISHED,
      filterCondition: {}
    },
    {
      header: 'Đang trả lead',
      type: LeadType.RETURNING,
      filterCondition: {}
    }
  ];

  leadList = {
    limit: 10,
    page: 0,
    totalItems: 0,
    itemsSource: []
  };

  initTabIndex = 0;

  constructor(private leadService: LeadService,
              private route: ActivatedRoute,
              private dialog: DialogService) {
    super();
    const self = this;
    const subRoute = this.route.queryParams.subscribe(params => {
      if (params.type) {
        const index = self.tabs.findIndex(tab => tab.type === +params.type);
        self.initTabIndex = index > -1 ? index : 0;
      }
    });
    this.subscriptions.push(subRoute);
  }

  ngOnInit(): void {
    this.onChangedTab({index: this.initTabIndex});
  }

  onChangedTab(event: MatTabChangeEvent): void {
    this.selectedTab = {
      index: event.index,
      tab: this.tabs[event.index]
    };

    this.leadList.page = 1;
    this.leadList.totalItems = 0;
    this.leadList.itemsSource = [];

    this._loadLeads(this._generateParamGetLeads());
  }

  onFinishedAnimation(): void {
    console.log('finished animation');
  }

  loadMore(): void {
    this.leadList.page += 1;
    const queryParams = this._generateParamGetLeads();
    this._loadLeads(queryParams);
  }

  isShowLoadMoreButton(): boolean {
    return this.leadList.totalItems > this.leadList.page * this.leadList.limit;
  }

  private _loadLeads(params: QueryParams): void {
    const httpSub = this.leadService.getList(params)
      .subscribe((res: ListLeadResponse) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          const leadList = res.data.entries;
          this.leadService.convertTimeToDownPriceToMMss(leadList);
          this.leadList.itemsSource.push(...leadList);
          Object.assign(this.leadList, {
            page: res.data.meta.page,
            limit: res.data.meta.limit,
            totalItems: res.data.meta.totalItems
          });
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
      }, error => {
      });

    this.subscriptions.push(httpSub);
  }

  private _generateParamGetLeads(): QueryParams {
    return {
      page: this.leadList.page,
      status: this.selectedTab.tab.type,
      limit: this.leadList.limit
    };
  }
}
