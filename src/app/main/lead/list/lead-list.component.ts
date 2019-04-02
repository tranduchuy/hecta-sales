import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { MatTabChangeEvent } from '@angular/material/typings/tabs';
import { LeadService } from '../shared/lead.service';
import { LeadType } from '../shared/lead.type';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { DialogService } from '../../../shared/components/dialog/dialog.service';
import { ListLeadResponse } from '../shared/model/LeadListResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadMessages } from '../shared/messages';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { General } from 'app/shared/constants/general.constant';

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

  notifies: any;

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
    },
    {
      header: 'Không được trả lead',
      type: General.Notify.RETURN_LEAD_FAIL,
      filterCondition: {}
    },
    {
      header: 'Trả lead/Hoàn tiền',
      type: General.Notify.RETURN_LEAD_SUCCESSFULLY,
      filterCondition: {}
    }
  ];

  LEAD_TYPE = LeadType;
  NOTIFY_TYPE = General.Notify;
  MESSAGES = LeadMessages;

  leadList = {
    limit: 10,
    page: 0,
    totalItems: 0,
    itemsSource: []
  };

  constructor(private leadService: LeadService,
              private route: ActivatedRoute,
              private router: Router,
              private fuseProgressBarService: FuseProgressBarService,
              private dialog: DialogService) {
    super();
    const self = this;

    const subRoute = this.route.queryParams.subscribe(params => {
      if (params.type) {
        const index = self.tabs.findIndex(tab => tab.type === +params.type);
        self.loadTabContent(index > -1 ? index : 0);
      }
    });
    this.subscriptions.push(subRoute);
  }

  ngOnInit(): void {
  }

  onChangedTab(event: MatTabChangeEvent): void {
    const leadType = this.tabs[event.index].type;
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: {type: leadType}});
  }

  loadTabContent(tabIndex: number): void {
    this.selectedTab = {
      index: tabIndex,
      tab: this.tabs[tabIndex]
    };

    if (this.selectedTab.tab.type === General.Notify.RETURN_LEAD_FAIL) {
      this.getListNotReturningFail(1);
      return;
    }

    if (this.selectedTab.tab.type === General.Notify.RETURN_LEAD_SUCCESSFULLY) {
      this.getListReturnSuccess(1);
      return;
    }

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

  getListNotReturningFail(page: number = 1): void {
    const query = {
      type: General.Notify.RETURN_LEAD_FAIL,
      page: page
    };

    const sub = this.leadService.getListNotify(query).subscribe(
      (res: any) => {
        this.notifies = res.data.entries;
      }
    );

    this.subscriptions.push(sub);
  }

  getListReturnSuccess(page: number = 1): void {
    const query = {
      type: General.Notify.RETURN_LEAD_SUCCESSFULLY,
      page: page
    };

    const sub = this.leadService.getListNotify(query).subscribe(
      (res: any) => {
        this.notifies = res.data.entries;
      }
    );

    this.subscriptions.push(sub);
  }

  private _loadLeads(params: QueryParams): void {
    this.fuseProgressBarService.show();

    const httpSub = this.leadService.getList(params)
      .subscribe((res: ListLeadResponse) => {
        this.fuseProgressBarService.hide();

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
