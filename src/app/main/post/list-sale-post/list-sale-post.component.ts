import {AfterContentInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PageBaseComponent} from '../../../shared/components/base/page-base.component';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/internal/operators';
import {ListSalePostService} from './list-sale-post.service';
import {HelperService} from '../../../shared/services/helper.service';
import { General } from 'app/shared/constants/general.constant';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import {DialogResult, DialogService} from '../../../shared/components/dialog/dialog.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-list-sale-post',
  templateUrl: './list-sale-post.component.html',
  styleUrls: ['./list-sale-post.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [ListSalePostService]
})
export class ListSalePostComponent extends PageBaseComponent implements AfterContentInit {
  posts: any[] = [];
  query:any;
  page = 1;
  total = 1;
  itemCount = 0;
  sub: any;
  formality: any;
  type: any;
  titleH2 = "Nhà đất bán - Nhà đất cho thuê";
  textEndPage: string = "";
  environment = environment;
  GlobalConstant = General;

  searchBoxValue = {
    'formality': null,
    'type': null,
    'city': null,
    'district': null,
    'ward': null,
    'street': null,
    'project': null,
    'area': null,
    'price': null,
    'direction': null,
    'bedroomCount': null
  };
  displayedColumns = ['id', 'form', 'title', 'action', 'viewCount', 'refresh', 'from', 'to'];
  // displayedColumns = ['id',	'Mã tin',	'title',	'action',	'view',	'Ngày New tin',	'Ngày bắt đầu',	'Ngày hết hạn'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  constructor(
    private helperService: HelperService,
    private listSalePostService: ListSalePostService,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private _fuseProgressingBarService: FuseProgressBarService
  ) {
    super();
    this.sub = this.route.queryParams
      .subscribe(params => {
        this.query = {
          page : 1,
          postType : 1
        };

        this.type = null;
        this.formality = null;

        if(params['formality']) this.query.formality = params['formality'];
        if(params['type']) this.query.type =  params['type'];
        this.query.page = params['page'] || 1;
      });

    this.subscriptions.push(this.sub);
  }

  ngAfterContentInit() {
    this.loadPosts();
  }

  loadPosts() {
    this._fuseProgressingBarService.show();
    const sub = this.listSalePostService.getList(this.query)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.mapItems(res.data.items);
          this.total = res.data.items.length;
          this.page = res.data.page;
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
        this._fuseProgressingBarService.hide();
      });
    this.subscriptions.push(sub);
  }

  private mapItems(items: any[]) {
    this.posts = items.map(item => {
      const _item = this.helperService.mapFullInfoForPostForProfile(item);
      return _item;
    });
  }

  private upNew(item, index) {
    const position = index + 1 + ((this.query.page - 1) * 20);
    const message = 'Bạn có chắc chắn muốn Up Tin đăng số: ' + position;
    const sub = this.dialog.openConfirm(message)
      .subscribe(value =>{
        if(value === 0){
          this.sendRequestUpNew(item);
        }
      });
    this.subscriptions.push(sub);
  }

  private updateAdStatus(item, index) {
    const position = index + 1 + ((this.query.page - 1) * 20);
    const status = item.adStatus === this.GlobalConstant.AdStatus.PAID_FORM_VIEW_ACTIVE ? 'Kích hoạt' : 'Tạm dừng';
    const message = 'Bạn có chắc chắn muốn ' + status + ' Tin đăng số: ' + position;
    const sub = this.dialog.openConfirm(message)
      .subscribe(value =>{
        if (value === 0){
          this.sendRequestUpdateAdStatus(item);
        }
      });
    this.subscriptions.push(sub);
  }

  private updateBudgetPerDay(item, index) {
    const position = index + 1 + ((this.query.page - 1) * 20);
    const message = 'Ngân sách mỗi ngày đ/ngày cho Tin đăng số: ' + position;
    const sub = this.dialog.openNumber(message, item.budgetPerDay)
      .subscribe((res:any) =>{
        if(res.result === 0){
          this.sendRequestUpdateBudgetPerDay(item, res.value);
        }
      });
    this.subscriptions.push(sub);
  }

  private upCpv(item, index) {
    const position = index + 1 + ((this.query.page - 1) * 20);
    const message = 'Giá thầu đ/ngày cho Tin đăng số: ' + position;
    const sub = this.dialog.openNumber(message, item.cpv)
      .subscribe((res:any) => {
          if (res.result === 0) {
            this.sendRequestUpdateCPV(item, res.value);
          }
        }
        );
    this.subscriptions.push(sub);
  }

  private sendRequestUpdateAdStatus(item){
    const status = item.adStatus === this.GlobalConstant.AdStatus.PAID_FORM_VIEW_ACTIVE ? this.GlobalConstant.AdStatus.PAID_FORM_VIEW_STOP : this.GlobalConstant.AdStatus.PAID_FORM_VIEW_ACTIVE;
    this._fuseProgressingBarService.show();
    const sub = this.listSalePostService.updateAdStatus(item.id, status)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo(res.message).subscribe().unsubscribe();
          this.loadPosts();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
        this._fuseProgressingBarService.hide();
      });
    this.subscriptions.push(sub);
  }

  private sendRequestUpNew(item){
    this._fuseProgressingBarService.show();
    const sub = this.listSalePostService.upNew(item.id)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo(res.message).subscribe().unsubscribe();
          this.loadPosts();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
        this._fuseProgressingBarService.hide();
      });
    this.subscriptions.push(sub);
  }

  private sendRequestUpdateBudgetPerDay(item, budgetPerDay){
    this._fuseProgressingBarService.show();
    const sub = this.listSalePostService.updateBudgetPerDay(item.id, budgetPerDay)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo(res.message).subscribe().unsubscribe();
          this.loadPosts();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
        this._fuseProgressingBarService.hide();
      });
    this.subscriptions.push(sub);
  }

  private sendRequestUpdateCPV(item, cpv){
    this._fuseProgressingBarService.show();
    const sub = this.listSalePostService.updateCPV(item.id, cpv)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo(res.message).subscribe().unsubscribe();
          this.loadPosts();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
        this._fuseProgressingBarService.hide();
      });
    this.subscriptions.push(sub);
  }

  onChangedPage(event){
    this.query.page = event.pageIndex + 1;
    this.loadPosts();
  }

}
