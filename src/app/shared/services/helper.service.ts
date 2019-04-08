import { Injectable } from '@angular/core';
import result from '../../shared/constants/selector.constant';
import { General } from 'app/shared/constants/general.constant';
import {StatusCd2Nm} from '../constants/status';

@Injectable()
export class HelperService {
  CityListOther1 = result.cityDistrictProject;
  CateSaleList = result.cateList;
  CateBuyList = result.cateListBuy;

  getCityByCode(cd: string): any {
    return this.CityListOther1.find(city => {
      return city.code === cd;
    });
  }

  getDistrictByValue(city: any, value: number): any {
    return city.district.find(d => {
      return d.id === value;
    });
  }

  getWardByValue(district: any, value: number): any {
    return district.ward.find(w => {
      return w.id.toString() === value.toString();
    });
  }
  getStreetByValue(district: any, value: number): any {
    return district.street.find(s => {
      return s.id.toString() === value.toString();
    });
  }
  getProjectByValue(district: any, value: number): any {
    return district.project.find(p => {
      return p.id.toString() === value.toString();
    });
  }

  getFormilitySaleByValue(value: number): any {
    return this.CateSaleList.find(c => {
      return c.id === value;
    });
  }

  getFormilityBuyByValue(value: number): any {
    return this.CateBuyList.find(c => {
      return c.id === value;
    });
  }

  getTypeByValue(formality: any, value: number | string): any {
    if (this.isUndefinedOrNull(value)) {
      return null;
    }

    return formality.children.find(t => {
      return t.id.toString() === value.toString();
    });
  }

  getUnitByValue(formality: any, value: number | string): any {
    if (this.isUndefinedOrNull(value)) {
      return null;
    }
    // console.log('formality', formality);
    return formality.prices.find(p => {
      return p.id.toString() === value.toString();
    });
  }

  private isUndefinedOrNull(value: any): boolean {
    return value === undefined || value === null;
  }

  getLocationTitle (data: any){
    let locationTitle: string = 'Việt Nam';

    if (data.city){
      locationTitle = data.city.name;
    }

    if (data.district && data.city){
      locationTitle = data.district.pre == '' ?  data.district.name + ', ' + data.city.name : data.district.pre + ' ' + data.district.name + ', ' + data.city.name;
    }

    if (data.ward && data.district){
      locationTitle = data.ward.pre == '' ? data.ward.name + ', ' + data.district.name : data.ward.pre + ' ' + data.ward.name + ', ' + data.district.name;
    }

    if (data.street && data.district){
      locationTitle = data.street.pre == '' ? data.street.name : data.street.pre + ' ' + data.street.name;
    }

    if (data.project && data.district){
      locationTitle =  data.project.name;
    }

    return locationTitle;
  }

  getTitle(data: any){
    let title: string = '';

    if (data.formality) {
      title = data.formality.name;
    }

    if (data.formality && data.type) {
      title = data.type.name;
    }
    return title;
  }

  mapFullInfoForPostForProfile(item: any) {
    let result = item;

    result.refresh = item.refresh ? new Date(item.refresh) : '';
    result.from = item.refresh ? new Date(item.from) : '';
    result.to = item.refresh ? new Date(item.to) : '';
    result.link = '/chi-tiet-bds/' + item.url;
    result.priority = result.priority ? result.priority : null;
    result.postId = item.postId ? item.postId : '';

    //get priority
    result.priorityText = result.priority ? General.PriorityList.find(p => {return p.id === item.priority}).name : '';

    result.status = StatusCd2Nm(result.status);
    result.adStatusText = StatusCd2Nm(result.adStatus);

    if(result.to.getTime() - new Date().getTime() > 0) result.statusText = 'Còn hạn';
    else result.statusText = 'Hết hạn';

    // image: get first link or use default link
    if (item.images && item.images.length > 0) {
      result.image = item.images[0];
    } else {
      result.image = 'assets/images/thumb-1.jpg';
    }

    return result;
  }
  mapFullInfoForPost(item: any) {
    const result = {
      address: item.address || '',
      date: item.date ? new Date(item.date) : new Date(),
      type: (item.priority || '').toString(),
      title: item.title || '',
      content: item.description || '',
      price: item.price || '',
      image: '',
      link: '',
      area: item.area || '',
      unit: ''
    };

    // find unit
    const formality = this.getFormilitySaleByValue(item.formality);
    if (formality) {
      const unit = item.unit ? this.getUnitByValue(formality, item.unit) : null;
      result.unit = unit ? unit.name : '';
    }

    // find city
    const city = this.getCityByCode(item.city);
    if (city) {
      // TODO: maybe need to show info city, district, ward
    }

    // image: get first link or use default link
    if (item.images && item.images.length > 0) {
      result.image = item.images[0];
    } else {
      result.image = 'assets/images/thumb-1.jpg';
    }

    return result;
  }

}
