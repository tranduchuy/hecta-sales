import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLs } from 'app/shared/constants/url.constant';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _httpClient: HttpClient, private _cookieService: CookieService) { }

  getMessages(currentPage: number, limit = 10): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(currentPage));
    params = params.append('limit', String(limit));
    return this._httpClient.get<any>(URLs.INBOX, {params: params});
  }

  seenMessage(id: string, status: number): Observable<any> {
    return this._httpClient.put<any>(`${URLs.INBOX}/${id}`, {status: status}, {
      headers: new HttpHeaders({
        'accessToken': this._cookieService.get('accessToken')
      })
    });
  }
}
