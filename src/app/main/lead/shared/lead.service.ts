import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  convertTimeToDownPriceToMMss(leads: LeadResponse[] = []): void {
    leads.forEach((lead: LeadResponse) => {
      // @ts-ignore
      const diffTime: any = new Date() - new Date(lead.timeToDownPrice);
      if (diffTime > 0) {
        lead.timeToDownPriceInMMss = `${Math.floor(diffTime / 1000 / 60)}'${Math.floor(diffTime / 1000 % 60)}''`;
      } else {
        lead.timeToDownPriceInMMss = '-1';
      }
    });
  }
}
