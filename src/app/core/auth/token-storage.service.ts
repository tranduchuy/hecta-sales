import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenStorage {

  constructor(private cookieService: CookieService) { }
  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>this.cookieService.get('accessToken');
    return of(token);
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>this.cookieService.get('refreshToken');
    return of(token);
  }

  /**
   * Get user roles in JSON string
   * @returns {Observable<any>}
   */
  public getUserRoles(): Observable<any> {
    const roles: any = this.cookieService.get('userRoles');
    try {
      return of(JSON.parse(roles));
    } catch (e) {}
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    this.cookieService.set('accessToken', token, 7);
    return this;
  }

  /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    this.cookieService.set('refreshToken', token, 7);

    return this;
  }

  /**
   * Set user roles
   * @param roles
   * @returns {TokenStorage}
   */
  public setUserRoles(roles: any): any {
    if (roles != null) {
      this.cookieService.set('userRoles', JSON.stringify(roles), 7);
    }

    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
    this.cookieService.delete('userRoles');
  }
}
