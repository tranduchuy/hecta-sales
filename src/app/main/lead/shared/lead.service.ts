import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLs } from '../../../shared/constants/url.constant';
import { LeadResponse } from './model/LeadResponse';

@Injectable()
export class LeadService {
  constructor(private _httpClient: HttpClient) {
  }

  getList(params: any): Observable<any> {
    return this._httpClient.get(URLs.Lead.List, {params});
  }

  getLeadById(id: string): Observable<any> {
    return this._httpClient.get(`${URLs.Lead.List}/${id}`);
  }

  buyLead(id: string): Observable<any> {
    return this._httpClient.post(URLs.Lead.BuyLead, {leadId: id});
  }

  convertTimeToDownPriceToMMss(leads: LeadResponse[] = []): void {
    leads.forEach((lead: LeadResponse) => {
      const diffTime: number = new Date(lead.timeToDownPrice).getTime() - new Date().getTime();
      if (diffTime > 0) {
        lead.timeToDownPriceInMMss = `${Math.floor(diffTime / 1000 / 60)}'${Math.floor(diffTime / 1000 % 60)}''`;
      } else {
        lead.timeToDownPriceInMMss = '-1';
      }
    });
  }

  getListNotify(query): Observable<any> {
    let params = new HttpParams();
    params = params.append('type', String(query.type));
    params = params.append('page', String(query.page));
    return this._httpClient.get<any>(URLs.NOTIFY, {params: params});
  }

  returnLead(data: {}): Observable<any> {
    return this._httpClient.post<any>(URLs.Lead.ReturnLead, data);
  }
}
