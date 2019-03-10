import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UpdatePassword } from '../model/update-password';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { URLs } from 'app/shared/constants/url.constant';
import { UserProfile } from '../model/user-profile';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  public updatePassword(updatePassword: UpdatePassword): Observable<any> {
    return this.httpClient.post<any>(environment.apiEndpoint + URLs.UPDATE, updatePassword)
  }

  /**
   * updateProfile
   */
  public updateProfile(user: UserProfile): Observable<UserProfile> {
    return this.httpClient.post<UserProfile>(environment.apiEndpoint + URLs.UPDATE, user)
  }

  /**
   * getUser
   */
  public getUser(): Observable<any> {
    return this.httpClient.get<any>(environment.apiEndpoint + URLs.USER, {
      headers: new HttpHeaders({
        'accessToken': this.cookieService.get('accessToken')
      })
    })
  }

}
