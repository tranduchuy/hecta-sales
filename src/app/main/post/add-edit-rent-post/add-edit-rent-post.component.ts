import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {EditableFormBaseComponent} from '../../../shared/components/base/editable-form-base.component';
import {Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { DateService } from '../../../shared/services/helper/date.service';
import result from '../../../shared/constants/selector.constant';
import {StrService} from '../../../shared/services/helper/str.service';
import { PostService } from '../post.service';
import {Observable} from 'rxjs';
import {HelperService} from '../../../shared/services/helper.service';

@Component({
  selector: 'app-add-edit-rent-post',
  templateUrl: './add-edit-rent-post.component.html',
  styleUrls: ['./add-edit-rent-post.component.scss'],
  providers: [DateService, HelperService]
})
export class AddEditRentPostComponent extends EditableFormBaseComponent implements AfterContentInit {
  CityListOther1 = result.cityDistrictProject;
  AreaList = result.areaList;
  CateBuyList = result.cateListBuy;
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
    address: [],
    area: [],
    price: [],
    unit: '',
    keywordList: [],
    receiveMail: [{text: 'Nhận email phản hồi', value: 1}]
  };

  basicForm = {
    totalValue: '',
    titleLengthRemind: 99,
    showTitleTooltip: false,
    showKeywordTooltip: false,
    descriptionLengthRemind: 3000,
    errorSubmit: false,
    keywordRemind: 0,
    keywordListshow: []
  };


  selectedObjs = {
    city: {
      index: -1
    },
    district: {
      index: -1
    }
  };

  constructor(
              private postService: PostService,
              private helperService: HelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dateService: DateService) {
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


  ngAfterContentInit(){
    this.initForm();
    this.initItemsSourceCities();
    this.initItemsSourceArea();
    this.initItemsSourceForm();
    this.loadPostsDetail();
  }

  private initItemsSourceCities() {
    this.itemsSource.cityOrProvinces = this.CityListOther1.map(city => {
      return {
        text: city.name,
        value: city.code
      };
    });
  }

  initForm() {
    const today = new Date();
    const from = this.dateService.startOfDate(today);
    const to = this.dateService.addMonth(from, 1);

    this.form = this.fb.group({
      publishStartDate: [from, []],
      publishEndDate: [to, []],
      title: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(99)]], // tiêu đề,
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(3000)]], // nội dung
      keywordList: [null, []],
      formality: [null, [Validators.required]],
      type: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
      ward: [null, []], // phường
      street: [null, []], // duong
      project: [null, []], // dự án
      area: [null, []],
      address: [null, Validators.required],
      price: [0, []], // giá
      unit: [null, []], // đơn vị của giá
      contactName: [null, []],
      contactAddress: [null, []],
      contactPhone: [null, [Validators.minLength(8), Validators.maxLength(11)]],
      contactMobile: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      contactEmail: [null, [Validators.email]],
      images: [[], []],
      captchaToken: [null, [Validators.required]],
      receiveMail: []
    });
  }

  post(){
    const params = this.generatePostObject();
    let req: Observable<any>;

    if (this.onFlowEdit) {
      req = this.postService.updateBuyInfo(this.params.id, params);
    } else {
      req = this.postService.createBuy(params);
    }

    const sub = req
      .subscribe((res: any) => {
        if (res.status !== 1) {
          alert([res.message]);
          return;
        }

        alert(res.message);
        this.router.navigate(['/campaign']);
      });
    this.subscriptions.push(sub);
  }

  onCatchTokenCaptcha(value: string) {
    this.form.controls.captchaToken.setValue(value);
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

  onClickBtnSubmit() {
    this.onSubmit();
  }

  private generatePostObject(): any {
    const params = {...this.form.value};

    // required
    params.title = params.title;
    params.description = params.description;
    params.formality = params.formality.value;
    params.type = params.type.value;
    params.city = params.city.value;
    params.district = params.district.value;
    params.address = params.address;
    params.captchaToken = params.captchaToken;
    params.contactMobile = params.contactMobile;

    // not require
    // TODO remove space first && last of keywordList
    params.keywordList = params.keywordList ? params.keywordList.toString().split(',') : null;

    params.images = params.images ? StrService.mapDataImage(params.images) : null;

    params.ward = params.ward ? params.ward.value : null;
    params.street = params.street ? params.street.value : null;
    params.project = params.project ? params.project.value : null;

    params.areaMin = params.area ? params.area.min.value : null;
    params.areaMax = params.area ? params.area.max.value : null;

    params.priceMin = params.price ? params.price.min.value : null;
    params.priceMax = params.price ? params.price.max.value : null;

    params.unit = params.unit ? params.unit : null;
    // contact
    params.contactName = params.contactName ? params.contactName : null;
    params.contactAddress = params.contactAddress ? params.contactAddress : null;
    params.contactPhone = params.contactPhone ? params.contactPhone : null;
    params.contactEmail = params.contactEmail ? params.contactEmail : null;
    params.receiveMail = params.receiveMail ? true : false;

    // time
    params.from = params.publishStartDate.getTime();
    params.to = params.publishEndDate.getTime();

    return params;
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
      this.selectedObjs.city.index = index;

      this.itemsSource.districts = this.CityListOther1[index].district.map(dis => {
        return {
          text: dis.name,
          value: dis.id
        };
      });
      this.updateAddressInBasicInfo();
    }
  }

  private initItemsSourceArea() {
    this.itemsSource.area = this.AreaList.map(area => {
      return {
        text: area.Value,
        value: area.Name,
        min: area.min,
        max: area.max
      };
    });
  }

  onChangedWard() {
    this.updateAddressInBasicInfo();
  }

  onChangedStreet() {
    this.updateAddressInBasicInfo();
  }

  onChangedProject() {
    this.updateAddressInBasicInfo();
  }

  onChangedDistrict(district) {
    this.form.get('ward').setValue(null);
    this.form.get('street').setValue(null);
    this.form.get('project').setValue(null);


    const index = this.CityListOther1[this.selectedObjs.city.index].district.findIndex(item => {
      return item.id.toString() === district.value.toString();
    });

    if (index > -1) {
      this.selectedObjs.district.index = index;
      const targetDistrict = this.CityListOther1[this.selectedObjs.city.index].district[index];
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
          value: proj.id
        };
      });

      this.updateAddressInBasicInfo();
    }
  }

  private initItemsSourceForm() {
    this.itemsSource.forms = this.CateBuyList.map(cate => {
      return {
        text: cate.name,
        value: cate.id
      };
    });
  }

  onSelectForm(form) {
    this.form.get('unit').setValue(null);
    this.form.get('type').setValue(null);
    this.form.get('price').setValue(null);

    if (form === null) {
      return;
    }

    const index = this.CateBuyList.findIndex(item => item.id.toString() === form.value.toString());
    if (index >= 0) {

      this.itemsSource.categories = this.CateBuyList[index].children.map(item => {
        return {
          text: item.name,
          value: item.id
        };
      });

      this.itemsSource.price = this.PriceLevel[index].map(price => {
        return {
          text: price.Value,
          value: price.Name,
          min: price.min,
          max: price.max
        };
      });

      if (index === 1) {
        this.itemsSource.unit = '/Tháng';
      }

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

  loadPostsDetail() {
    if (this.params.id) {
      const sub = this.postService.getDetail({postId: this.params.id})
        .subscribe(res => {
          if (res.status !== 1) {
            alert([res.message]);
          } else {
            this.oldData = res.data;
            this.setValueForm(res.data);
            this.disableSettings.btnInsert = false;
          }
        });
      this.subscriptions.push(sub);
    }
  }


  /**
   * Use when flow edit
   */
  private mapAreaByValue(id: any): any {
    return this.itemsSource.area.find(item => {
      return item.value.toString() === id.toString();
    });
  }

  /**
   * Use when flow edit
   */
  private mapPriceByValue(id: any): any {
    return this.itemsSource.price.find(item => {
      return item.value.toString() === id.toString();
    });
  }

  setValueForm(data: any) {
    const params = { ...data };
    params.from = new Date(params.from);
    params.to = new Date(params.to);
    if (params.receiveMail === true) {
      params.receiveMail = [1];
    }
    // get formality
    const _objFormality = this.helperService.getFormilityBuyByValue(params.formality);
    if (_objFormality) {
      params.formality = {
        text: _objFormality.name,
        value: _objFormality.id
      }
      this.onSelectForm(params.formality);

      const _objType = this.helperService.getTypeByValue(_objFormality, params.type);
      if (_objType) {
        params.type = {
          text: _objType.name,
          value: _objType.id
        };
      }
      const _objArea = this.mapAreaByValue(params.area || '');
      if (_objArea) {
        params.area = {
          text: _objArea.name,
          value: _objArea.id
        };
      }
      const _objPrice = this.mapPriceByValue(params.price || '');
      if (_objPrice) {
        params.price = {
          text: _objPrice.name,
          value: _objPrice.id
        };
      }
    }

    delete params.city;
    delete params.district;
    delete params.ward;
    delete params.street;
    delete params.project;

    params.images = StrService.mapIFileTextValue(params.images);

    this.form.patchValue(params);

    const keyword = params.keywordList.map(key => {
      var str = '';
      str += (str === '') ? key.keyword : (',' + key.keyword);
      return str;
    });
    this.form.controls.keywordList.setValue(keyword);

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
            const _objWard = this.helperService.getWardByValue(_objDistrict, data.ward);
            if (_objWard) {
              this.form.controls.ward.setValue({
                text: _objWard.name,
                value: _objWard.id
              });
            }

            const _objStreet = this.helperService.getStreetByValue(_objDistrict, data.street);
            if (_objStreet) {
              this.form.controls.street.setValue({
                text: _objStreet.name,
                value: _objStreet.id
              });
            }

            const _objProject = this.helperService.getProjectByValue(_objDistrict, data.project);
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



}
