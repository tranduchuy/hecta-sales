import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { URLs } from 'app/shared/constants/url.constant';
import { Observable } from 'rxjs';
import { Transactions } from '../model/history-transactions.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) { }

  getBalance(): Observable<any> {
    return this._http.get<any>(URLs.USER)
  }

  getTransactions(currentPage: number): Observable<Transactions> {
    let params = new HttpParams();
    params = params.append('page', String(currentPage));
    return this._http.get<Transactions>(URLs.TRANSACTIONS_HISTORY, {
      params: params,
      headers: new HttpHeaders({
        'accessToken': this._cookieService.get('accessToken')
      })
    })
  }
}
