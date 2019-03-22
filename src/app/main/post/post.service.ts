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

  updateBuyInfo(id: string, data: any): Observable<any> {
    const url = URLs.Post.updateBuy.replace('{id}', id);
    return this._http.put(url, data);
  }
}
