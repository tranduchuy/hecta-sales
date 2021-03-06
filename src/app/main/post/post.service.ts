import { Injectable } from '@angular/core';
import {URLs} from '../../shared/constants/url.constant';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }
  createBuy(data: any): Observable<any> {
    return this._http.post(URLs.Post.createBuy, data);
  }
  createSale(data: any): Observable<any> {
    return this._http.post(URLs.Sale.createSale, data);
  }
  getVipTypes(): Observable<any> {
    return this._http.get(URLs.vipTypeList);
  }

  updateBuyInfo(id: string, data: any): Observable<any> {
    const url = URLs.Post.updateBuy.replace('{id}', id);
    return this._http.post(url, data);
  }
  updateSaleInfo(id: string, data: any): Observable<any> {
    const url = URLs.Sale.updatePostSale.replace('{id}', id);
    return this._http.post(url, data);
  }
  getDetail(params): Observable<any> {
    return this._http.get(URLs.Post.postDetail + params.postId, params);
  }
}
