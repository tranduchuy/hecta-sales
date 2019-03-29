import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdatePassword } from '../model/update-password';
import { Observable } from 'rxjs';
import { URLs } from 'app/shared/constants/url.constant';
import { UserProfile } from '../model/user-profile';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService
  ) {
  }

  public updatePassword(updatePassword: UpdatePassword): Observable<any> {
    return this._httpClient.post<any>(URLs.UPDATE, updatePassword);
  }

  /**
   * updateProfile
   */
  public updateProfile(data: any): Observable<UserProfile> {
    return this._httpClient.post<UserProfile>(URLs.UPDATE, data);
  }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this._httpClient.post(URLs.IMAGE_UPLOAD, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * getUser
   */
  public getUser(): Observable<any> {
    return this._httpClient.get<any>(URLs.USER, {
      headers: new HttpHeaders({
        'accessToken': this._cookieService.get('accessToken')
      })
    });
  }

  getUserInfoLoggedIn(): Promise<any> {
    const promise = this._httpClient.get<any>(URLs.USER, {
      headers: new HttpHeaders({
        'accessToken': this._cookieService.get('accessToken')
      })
    })
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);
        return settings;
      });
    return promise;
  }
}
