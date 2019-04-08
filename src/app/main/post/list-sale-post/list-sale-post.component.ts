import {AfterContentInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PageBaseComponent} from '../../../shared/components/base/page-base.component';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/internal/operators';
import {PostService} from '../post.service';
import {ListSalePostService} from './list-sale-post.service';
import {HelperService} from '../../../shared/services/helper.service';
import { General } from 'app/shared/constants/general.constant';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import {DialogResult, DialogService} from '../../../shared/components/dialog/dialog.service';

@Component({
  selector: 'app-list-sale-post',
  templateUrl: './list-sale-post.component.html',
  styleUrls: ['./list-sale-post.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [ListSalePostService]
})
export class ListSalePostComponent extends PageBaseComponent implements OnInit, AfterContentInit {
  dataSource: FilesDataSource | null;
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

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private helperService: HelperService,
    private listSalePostService: ListSalePostService,
    private route: ActivatedRoute,
    private dialog: DialogService
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

  ngOnInit(): void
  {
    this.dataSource = new FilesDataSource(this.listSalePostService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if ( !this.dataSource )
        {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngAfterContentInit() {
    this.loadPosts();
  }

  loadPosts() {
    const sub = this.listSalePostService.getList(this.query)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === HTTP_CODES.SUCCESS) {
          this.mapItems(res.data.items);
          this.total = res.data.items.length;
          this.page = res.data.page;
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
      });
    this.subscriptions.push(sub);
  }

  private mapItems(items: any[]) {
    this.posts = items.map(item => {
      const _item = this.helperService.mapFullInfoForPostForProfile(item);

      return _item;
    });
    console.log(this.posts);
  }

  private upNew(item) {
    let message = 'Bạn có chắc chắn muốn Up Tin đăng số: ' + item.id;
    this.dialog.openConfirm(message)
      .subscribe(value =>{
        if(value === 0){
          this.sendRequestUpNew(item);
        }
      });
  }

  private sendRequestUpdateAdStatus(item){
    const status = item.adStatus === this.GlobalConstant.AdStatus.PAID_FORM_VIEW_ACTIVE ? this.GlobalConstant.AdStatus.PAID_FORM_VIEW_STOP : this.GlobalConstant.AdStatus.PAID_FORM_VIEW_ACTIVE;
    this.listSalePostService.updateAdStatus(item.id, status)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo(res.message).subscribe().unsubscribe();
          this.loadPosts();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
      });
  }

  private sendRequestUpNew(item){
    this.listSalePostService.upNew(item.id)
      .subscribe((res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo(res.message).subscribe().unsubscribe();
          this.loadPosts();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
      });
  }

  private updateAdStatus(item) {
    let message = 'Bạn có chắc chắn muốn Tạm dừng Tin đăng số: ' + item.id;
    this.dialog.openConfirm(message)
      .subscribe(value =>{
        if(value === 0){
          this.sendRequestUpdateAdStatus(item);
        }
      });
  }


}
export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  /**
   * Constructor
   *
   * @param {EcommerceProductsService} _ecommerceProductsService
   * @param {MatPaginator} _matPaginator
   * @param {MatSort} _matSort
   */
  constructor(
    private _listSalePostService : ListSalePostService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  )
  {
    super();

    this.filteredData = this._listSalePostService.posts;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]>
  {
    const displayDataChanges = [
      this._listSalePostService.onPostsChanged,
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange
    ];

    return merge(...displayDataChanges)
      .pipe(
        map(() => {
            let data = this._listSalePostService.posts.slice();

            data = this.filterData(data);

            this.filteredData = [...data];

            data = this.sortData(data);

            // Grab the page's slice of data.
            const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
            return data.splice(startIndex, this._matPaginator.pageSize);
          }
        ));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any
  {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any)
  {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string
  {
    return this._filterChange.value;
  }

  set filter(filter: string)
  {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any
  {
    if ( !this.filter )
    {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[]
  {
    if ( !this._matSort.active || this._matSort.direction === '' )
    {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch ( this._matSort.active )
      {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'categories':
          [propertyA, propertyB] = [a.categories[0], b.categories[0]];
          break;
        case 'price':
          [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
          break;
        case 'quantity':
          [propertyA, propertyB] = [a.quantity, b.quantity];
          break;
        case 'active':
          [propertyA, propertyB] = [a.active, b.active];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void
  {
  }
}