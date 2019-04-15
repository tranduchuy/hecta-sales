import {AfterContentInit, Component, OnInit} from '@angular/core';
import {EditableFormBaseComponent} from '../../../shared/components/base/editable-form-base.component';
import {PostService} from '../post.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {HelperService} from '../../../shared/services/helper.service';
import {DateService} from '../../../shared/services/helper/date.service';
import {ActivatedRoute, Router} from '@angular/router';
import { infoTypes, unitByType } from '../../../shared/constants/info-types.constant';
import result from '../../../shared/constants/selector.constant';
import Direction from '../../../shared/constants/direction.constant';
import { General } from 'app/shared/constants/general.constant';
import {Validators} from '@angular/forms';
import {StrService} from '../../../shared/services/helper/str.service';
import {DialogService} from '../../../shared/components/dialog/dialog.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-add-edit-sale-post',
  templateUrl: './add-edit-sale-post.component.html',
  styleUrls: ['./add-edit-sale-post.component.scss'],
  providers: [DateService, HelperService]
})
export class AddEditSalePostComponent extends  EditableFormBaseComponent implements AfterContentInit {

  minDateFor = {
    startDate: new Date(),
    endDate: new Date()
  };


  GlobalConstant = General;

  CateSaleList = result.cateList || [];

  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  CityListOther1 = result.cityDistrictProject;
  AreaList = result.areaList;
  PriceLevel = result.priceLevel1;
  form;
  oldData: any = null;
  onFlowEdit = false;
  params: any = {};
  disableSettings = {
    btnInsert: false,
    projectField: true,
    userField: true
  };
  itemsSource = {
    forms: [], // các hình thức
    cityOrProvinces: [],
    categories: [],
    districts: [],
    wards: [],
    streets: [],
    projects: [],
    units: [],
    directions: Direction,
    infoTypes: [], // loại tin rao
    keywordList: [],
    receiveMail: [{text: 'Nhận email phản hồi', value: 1}],
    paidForm: [
      {text: 'Trả theo ngày', value: this.GlobalConstant.PAID_FORM.DAY},
      {text: 'Trả theo lượt xem tin', value: this.GlobalConstant.PAID_FORM.VIEW}
    ]
  };

  selectedObjs = {
    cityOrProvinces: {
      index: -1
    },
    district: {
      index: -1
    }
  };

  basicForm = {
    totalValue: '',
    titleLengthRemind: 99,
    showTitleTooltip: false,
    showKeywordTooltip: false,
    descriptionLengthRemind: 3000,
    errorSubmit: false,
    keywordRemind: 0,
    keywordListshow: [],
    priceIsDisabled: false
  };

  googleAddress: '';
  // form: lịch đăng tin
  publishInfoScheduleForm = {
    dateRange: 0,
    unitValue: {
      value: 0,
      text: <any>'',
      description: ''
    }
  };
  // form total price
  totalPrice = {
    before: '',
    vat: '',
    after: ''
  };

  showPaidForm = this.GlobalConstant.PAID_FORM.DAY;

  constructor(private postService: PostService,
              private helperService: HelperService,
              private router: Router,
              private dialog: DialogService,
              private activatedRoute: ActivatedRoute,
              private dateService: DateService,
              private _fuseProgressingBarService: FuseProgressBarService) {
    super();
    const sub = this.activatedRoute.queryParams.subscribe(params => {
      if (params.id) {
        // case update campaign
        this.params = params;
        this.onFlowEdit = true;
      }
    });
    this.subscriptions.push(sub);
  }

  initForm() {
    const today = new Date();
    const from = this.dateService.startOfDate(today);
    const to = this.dateService.addMonth(from, 1);

    const fromPaidFormView = this.dateService.startOfDate(today);

    this.showPaidForm = this.GlobalConstant.PAID_FORM.DAY;

    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(30), Validators.maxLength(99)]], // tiêu đề,
      formality: [null, [Validators.required]],
      type: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
      ward: [null, []], // phường
      street: [null, []], // duong
      project: [null, []], // dự án
      area: [null, []],
      price: [null, []], // giá
      unit: [null, []], // đơn vị
      address: [null, [Validators.required]], // địa chỉ
      description: [null, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(3000)]
      ], // nội dung
      keywordList: [null, []],
      streetWidth: [null, []],
      frontSize: [null, []],
      direction: [null, []],
      balconyDirection: [null, []],
      floorCount: [null, []],
      bedroomCount: [null, []],
      toiletCount: [null, []],
      furniture: [null, []], // nội thất
      images: [[], []],
      googleAddress: [null, []],
      contactName: [null, []],
      contactAddress: [null, []],
      contactPhone: [null, [Validators.minLength(8), Validators.maxLength(11)]],
      contactMobile: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      contactEmail: [null, [Validators.pattern(this.emailPattern)]],
      receiveMail: [],
      priority: [this.itemsSource.infoTypes[0], [Validators.required]],
      from: [from, [Validators.required]],
      to: [to, [Validators.required]],
      paidForm: [this.itemsSource.paidForm[0].value, [Validators.required]],
      cpv: [null, []],
      budgetPerDay: [null, []],
      fromPaidFormView: [fromPaidFormView, [Validators.required]],

      captchaToken: [null, [Validators.required]]
    });

  }

  private initItemsSourceForm() {
    this.itemsSource.forms = this.CateSaleList.map(cate => {
      return {
        text: cate.name,
        value: cate.id
      };
    });
  }

  private initItemsSourceCities() {
    this.itemsSource.cityOrProvinces = this.CityListOther1.map(city => {
      return {
        text: city.name,
        value: city.code
      };
    });
  }

  post(): void{
    const params = this.generatePostObject();
    console.log(params);

    if (params.paidForm === this.GlobalConstant.PAID_FORM.VIEW &&
      params.cpv > params.budgetPerDay) {
      this.dialog.openWarning('Ngân sách mỗi ngày không được nhỏ hơn giá thầu.');
      this.basicForm.errorSubmit = true;
      this._fuseProgressingBarService.hide();
      return;
    }
    this._fuseProgressingBarService.show();
    let req: Observable<any>;

    if (this.onFlowEdit) {
      req = this.postService.updateSaleInfo(this.params.id, params);
    } else {
      req = this.postService.createSale(params);
    }
    const sub = req
      .subscribe((res: any) => {
        if (res.status !== 1) {
          alert([res.message]);
          return;
        }

        alert(res.message);
        this.router.navigate(['/post/list-sale-post']);
      });
    this.subscriptions.push(sub);
    this._fuseProgressingBarService.hide();
  }

  onTitleChanged(value: any) {
    this.basicForm.titleLengthRemind = 99 - value.toString().length;
  }

  onDescriptionChanged(value: any) {
    this.basicForm.descriptionLengthRemind = 3000 - value.toString().length;
  }

  onKeywordChanged(value: any) {
    this.basicForm.keywordListshow = value.toString().split(',');
    this.basicForm.keywordRemind = this.basicForm.keywordListshow.length;
  }

  onPaidFormChange(value: any) {
    if (value === this.GlobalConstant.PAID_FORM.VIEW) {
      this.showPaidForm = value;
      this.form.controls.paidForm.setValue(this.itemsSource.paidForm[0].value);
    } else {
      this.showPaidForm = value;
    }
  }

  onSelectForm(form) {
    this.form.get('unit').setValue(null);
    this.form.get('type').setValue(null);

    if (form === null) {
      return;
    }

    const index = this.CateSaleList.findIndex(item => item.id.toString() === form.value.toString());
    if (index >= 0) {
      this.itemsSource.categories = this.CateSaleList[index].children.map(item => {
        return {
          text: item.name,
          value: item.id
        };
      });

      this.itemsSource.units =this.CateSaleList[index].prices.map(price => {
        return {
          text: price.name,
          value: price.id
        };
      });
    }
  }

  onSelectUnitPrice(price) {
    if (this.form.get('unit').value && (this.form.get('unit').value.value === '0')) {
      this.form.get('price').setValue('');
      this.basicForm.priceIsDisabled = true;
    } else {
      this.basicForm.priceIsDisabled = false;
    }

    this.updateBasicInfoTotalValue();
  }

  onCatchTokenCaptcha(value: string) {
    this.form.controls.captchaToken.setValue(value);
  }

  private updateBasicInfoTotalValue() {
    if (this.form.get('unit').value) {
      this.basicForm.totalValue = `${this.form.get('price').value ? this.form.get('price').value : ''} ${this.form.get('unit').value.text}`;
    } else {
      this.basicForm.totalValue = '';
    }
  }

  private updateAddressInBasicInfo() {
    let address = '';

    if (this.form.get('project').value) {
      address += this.form.get('project').value.text;
    } else {
      if (this.form.get('street').value) {
        address += this.form.get('street').value.text;
      }

      if (this.form.get('ward').value) {
        address += `, ${this.form.get('ward').value.text}`;
      }
    }

    if (this.form.get('district').value) {
      address += `, ${this.form.get('district').value.text}`;
    }

    if (this.form.get('city').value) {
      address += `, ${this.form.get('city').value.text}`;
    }

    if (address[0] === ',') {
      address = address.replace(', ', '');
    }

    this.form.controls.address.setValue(address);
  }

  onChangedCity(city) {
    this.form.get('district').setValue(null);
    this.form.get('ward').setValue(null);
    this.form.get('street').setValue(null);
    this.form.get('project').setValue(null);

    if (!city) {
      return;
    }

    const index = this.CityListOther1.findIndex(item => item.code.toString() === city.value.toString());
    if (index >= 0) {
      this.selectedObjs.cityOrProvinces.index = index;

      this.itemsSource.districts = this.CityListOther1[index].district.map(dis => {
        return {
          text: dis.name,
          value: dis.id
        };
      });
      this.updateAddressInBasicInfo();
    }
  }

  onChangedDistrict(district) {
    this.form.get('ward').setValue(null);
    this.form.get('street').setValue(null);
    this.form.get('project').setValue(null);

    if (!district) {
      return;
    }

    const index = this.CityListOther1[this.selectedObjs.cityOrProvinces.index].district.findIndex(item => {
      return item.id.toString() === district.value.toString();
    });

    if (index > -1) {
      this.selectedObjs.district.index = index;
      const targetDistrict = this.CityListOther1[this.selectedObjs.cityOrProvinces.index].district[index];
      this.itemsSource.wards = targetDistrict.ward.map(ward => {
        return {
          text: ward.name,
          value: ward.id
        };
      });

      this.itemsSource.streets = targetDistrict.street.map(str => {
        return {
          text: str.name,
          value: str.id
        };
      });

      this.itemsSource.projects = targetDistrict.project.map(proj => {
        return {
          text: proj.name,
          value: proj._id
        };
      });

      this.updateAddressInBasicInfo();
    }
  }

  onChangedWard(ward) {
    this.updateAddressInBasicInfo();
  }

  onChangedStreet(street) {
    this.updateAddressInBasicInfo();
  }

  onChangedProject(project) {
    this.updateAddressInBasicInfo();
  }

  private o(a) {
    const b = a.toString().split('.');
    b[0] = b[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return b.join('.');
  }

  private updatePublishUnitPrice() {

    const priority = this.form.get('priority').value;
    if (!priority) {
      return;
    }

    this.publishInfoScheduleForm.unitValue.description = unitByType[priority.value].txt;
    this.publishInfoScheduleForm.unitValue.text = priority.costByDay;

    let b: any = priority.costByDay * this.publishInfoScheduleForm.dateRange;

    let c: any = parseInt((parseInt(b, 0) / 10).toString(), 0);
    let d: any = b + c;
    if (b.toString().length >= 7) {
      b = this.o(b.toString().slice(0, -3)).replace(',', ' triệu ') + ' nghìn';
    } else {
      b = this.o(b).replace(',', ' nghìn ') + ' đồng';
    }
    c = this.o(c).replace(',', ' nghìn ') + ' đồng';
    if (d.toString().length >= 7) {
      d = this.o(d.toString().slice(0, -3)).replace(',', ' triệu ') + ' nghìn';
    } else {
      d = this.o(d).replace(',', ' nghìn ') + ' đồng';
    }

    this.totalPrice.before = b;
    this.totalPrice.vat = c;
    this.totalPrice.after = d;
  }



  onPublishTypeChanged(type) {
    this.updatePublishUnitPrice();
    this.calculateDateRange();
    this.onPublishStartDateChanged(this.form.get('from').value);
  }

  onPublishStartDateChanged(value: Date) {
    const vipType = this.form.get('priority').value;

    if (!vipType) {
      return;
    }

    this.minDateFor.endDate = this.dateService.addDate(value, vipType.minDay);
    const endDate = this.form.get('to').value;
    if (this.minDateFor.endDate.getTime() > endDate.getTime()) {
      this.form.get('to').setValue(this.minDateFor.endDate);
      this.onPublishEndDateChanged();
    } else {
      this.calculateDateRange();
      this.updatePublishUnitPrice();
    }
  }

  private calculateDateRange() {
    const to = this.form.controls.to.value;
    const from = this.form.controls.from.value;
    this.publishInfoScheduleForm.dateRange = this.dateService.countDaysBetweenDate(from, to);
  }

  onPublishEndDateChanged(value?: Date) {
    // this.publishInfoScheduleForm.endDate = value;
    this.updatePublishUnitPrice();
    this.calculateDateRange();
  }

  onPriceChanged(value: any) {
    this.updateBasicInfoTotalValue();
  }

  private generatePostObject(): any {
    const params = this.form.value;

    // required
    params.formality = params.formality.value;
    params.type = params.type.value;
    params.city = params.city.value;
    params.district = params.district.value;
    params.priorityId = params.priority._id;
    params.priority = params.priority.value;

    // not require
    // TODO remove space first && last of keywordList
    params.keywordList = params.keywordList ? params.keywordList.toString().split(',') : null;

    params.googleAddress = params.googleAddress ? params.googleAddress : null;

    params.images = params.images ? StrService.mapDataImage(params.images) : null;

    params.ward = params.ward ? params.ward.value : null;
    params.street = params.street ? params.street.value : null;
    params.project = params.project ? params.project.value : null;
    params.area = params.area ? params.area : null;
    params.price = params.price ? params.price : null;
    params.unit = params.unit ? parseInt(params.unit.value, 0) : null;

    params.streetWidth = params.streetWidth ? params.streetWidth : null;
    params.frontSize = params.frontSize ? params.frontSize : null;
    params.direction = params.direction ? params.direction.value : null;
    params.balconyDirection = params.balconyDirection ? params.balconyDirection.value : null;
    params.floorCount = params.floorCount ? params.floorCount : null;
    params.bedroomCount = params.bedroomCount ? params.bedroomCount : null;
    params.toiletCount = params.toiletCount ? params.toiletCount : null;
    params.furniture = params.furniture ? params.furniture : null;

    params.contactName = params.contactName ? params.contactName : null;
    params.contactAddress = params.contactAddress ? params.contactAddress : null;
    params.contactPhone = params.contactPhone ? params.contactPhone : null;
    params.contactEmail = params.contactEmail ? params.contactEmail : null;
    params.receiveMail = !!params.receiveMail;

    // params.direction = params.direction ? parseInt(params.direction.value, 0) : '';

    // time
    params.from = params.from.getTime();
    params.to = params.to.getTime();

    params.paidForm = params.paidForm ? params.paidForm : this.GlobalConstant.PAID_FORM.DAY;

    if (params.paidForm === this.GlobalConstant.PAID_FORM.DAY) {
      params.cpv = null;
      params.budgetPerDay = null;
    }
    else {
      params.priorityId = '5b865c6017519e8939bfa953'; // == vip 2
      params.priority = 3; // == vip 2
      params.cpv = params.cpv ? params.cpv : 0;
      params.budgetPerDay = params.budgetPerDay ? params.budgetPerDay : 0;
      params.from = params.fromPaidFormView.getTime();
    }

    return params;
  }

  onClickBtnSubmit() {
    this.onSubmit();
  }

  loadPostsDetail(): void {

    if (this.params.id) {
      const sub = this.postService.getDetail({postId: this.params.id})
        .subscribe(res => {
          this._fuseProgressingBarService.show();
          if (res.status !== 1) {
            alert([res.message]);
          } else {
            this.oldData = res.data;
            this.setValueForm(res.data);
            this.disableSettings.btnInsert = false;
          }
          this._fuseProgressingBarService.hide();
        });
      this.subscriptions.push(sub);
    }
  }

  setValueForm(data: any) {

    const params = {...data};
    params.from = new Date(params.from);
    params.to = new Date(params.to);
    params.fromPaidFormView = new Date(params.from);

    this.showPaidForm = params.paidForm;


    // get formality
    const _objFormality = this.helperService.getFormilitySaleByValue(params.formality);
    if (_objFormality) {
      params.formality = {
        text: _objFormality.name,
        value: _objFormality.id
      };

      this.initItemsSourceForm();

      const _objType = this.helperService.getTypeByValue(_objFormality, params.type);
      if (_objType) {
        params.type = {
          text: _objType.name,
          value: _objType.id
        };
      }

      const _objUnit = this.helperService.getUnitByValue(_objFormality, params.unit);
      if (_objUnit) {
        params.unit = {
          text: _objUnit.name,
          value: _objUnit.id
        };
      }
    }

    // get direction
    const _objDirection = this.helperService.getDirectionsByValue(params.direction);
    if (_objDirection) {
      params.direction = _objDirection;
    }

    const _objBalconyDirection = this.helperService.getDirectionsByValue(params.balconyDirection);
    if (_objBalconyDirection) {
      params.balconyDirection = _objBalconyDirection;
    }

    // get vip type
    const _objVipType = this.itemsSource.infoTypes.find(item => {
      return item.value === params.priority;
    });
    if (_objVipType) {
      params.priority = _objVipType;
    }

    delete params.city;
    delete params.district;
    delete params.ward;
    delete params.street;
    delete params.project;

    params.images = StrService.mapIFileTextValue(params.images);

    this.form.patchValue(params);

    //
    this.calculateDateRange();

    const keyword = params.keywordList.map(key => {
      var str = '';
      str += (str == '') ? key.keyword : (',' + key.keyword);
      return str;
    });
    this.form.controls.keywordList.setValue(keyword);

    // hiển thị đơn giá hằng ngày + giá tiền
    this.onPublishStartDateChanged(this.form.get('from').value);
    setTimeout(() => {
      this.updatePublishUnitPrice();
    });

    // get detail city
    const _objCity = this.helperService.getCityByCode(data.city);
    if (_objCity) {
      setTimeout(() => {
        const city = {
          text: _objCity.name,
          value: _objCity.code
        };
        this.form.controls.city.setValue(city);
        this.onChangedCity(city);
      }, 50);

      const _objDistrict = this.helperService.getDistrictByValue(_objCity, data.district);
      if (_objDistrict) {
        setTimeout(() => {
          const district = {
            text: _objDistrict.name,
            value: _objDistrict.id
          };
          this.form.controls.district.setValue(district);
          this.onChangedDistrict(district);

          setTimeout(() => {
            const _objWard = this.helperService.getWardByValue(_objDistrict, data.ward || '');
            if (_objWard) {
              this.form.controls.ward.setValue({
                text: _objWard.name,
                value: _objWard.id
              });
            }

            const _objStreet = this.helperService.getStreetByValue(_objDistrict, data.street || '');
            if (_objStreet) {
              this.form.controls.street.setValue({
                text: _objStreet.name,
                value: _objStreet.id
              });
            }

            const _objProject = this.helperService.getProjectByValue(_objDistrict, data.project || '');
            if (_objProject) {
              this.form.controls.project.setValue({
                text: _objProject.name,
                value: _objProject.id
              });
            }
          }, 100);
        }, 100);
      }
    }
  }


  ngAfterContentInit(): void {
    this.initForm();
    this.initItemsSourceCities();
    this.initItemsSourceForm();
    this.postService.getVipTypes().subscribe((res: any) => {
      if (res.status === 1) {
        this.itemsSource.infoTypes = res.data.map(item => {
          item.text = item.name;
          item.value = item.priority;
          delete item.name;
          delete item.priority;
          return item;
        });

        this.form.get('priority').setValue(this.itemsSource.infoTypes[0]);
        // this.onPublishTypeChanged(this.itemsSource.infoTypes[0]);
        const startDate = this.form.get('from').value;
        this.onPublishStartDateChanged(startDate);
        const endDate = this.dateService.addDate(startDate, this.itemsSource.infoTypes[0].minDay);
        this.form.get('to').setValue(endDate);

        setTimeout(() => {
          this.updatePublishUnitPrice();
        });
        this.loadPostsDetail();
      } else {
        this.dialog.openWarning('Không load được thông tin loại tin tức');
      }
    });
  }

}
