import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLs } from 'app/shared/constants/url.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(private _http: HttpClient) { }

  getBalance(): Observable<any>
  {
    return this._http.get<any>(URLs.USER)
  }
}
