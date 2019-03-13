import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLs} from '../../../shared/constants/url.constant';

@Injectable()
export class LeadService {
  constructor(private _httpClient: HttpClient) {
  }

  getList(params: any): Observable<any> {
    return this._httpClient.get(URLs.Lead.List, {params});
  }
}
