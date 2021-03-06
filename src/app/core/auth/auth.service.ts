import { Injectable } from '@angular/core';
import { from, Observable, Subject, timer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { AccessData } from './access-data';
import { Credential } from './credential';
import { Router } from '@angular/router';
import { URLs } from '../../shared/constants/url.constant';
import { Password } from './password';
import { User } from './user';
import { HTTP_CODES } from '../../shared/constants/http-code.constant';

@Injectable()
export class AuthService {
  public onCredentialUpdated$: Subject<AccessData>;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {
    this.onCredentialUpdated$ = new Subject();
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g. localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Get user roles
   * @returns {Observable<any>}
   */
  public getUserRoles(): Observable<any> {
    return this.tokenStorage.getUserRoles();
  }

  public getUserInfo(): Observable<any> {
    return this.tokenStorage.getUserInfo();
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === HTTP_CODES.ERROR_AUTHORIZED;
  }

  /**
   * Submit login request
   * @param {Credential} credential
   * @returns {Observable<any>}
   */
  public login(credential: Credential): Observable<any> {
    return this.http.post<AccessData>(URLs.LOGIN, credential)
      .pipe(
        map((res: any) => Object.assign({},
          {
            accessToken: res.data.token,
            refreshToken: res.data.refreshToken,
            roles: res.data.role,
            userInfo: res.data
          } as AccessData,
          {
            status: res.status
          })
        ),
        tap(this.saveAccessData.bind(this)),
        catchError(this.handleError('login', []))
      );
  }

  public register(user: User): Observable<any> {
    return this.http
      .post<User>(URLs.REGISTER, user)
      .pipe(
        catchError(this.handleError('register', []))
      );
  }

  public checkUser(username: string): Observable<any> {
    return this._checkEmailOrUsernameValidator({username: username});
  }

  public checkEmail(email: string): Observable<any> {
    return this._checkEmailOrUsernameValidator({email: email});
  }

  private _checkEmailOrUsernameValidator(data: any): Observable<any> {
    return timer(1000)
      .pipe(
        switchMap(() => {
          return this.http.post<any>(URLs.CHECK, data);
        })
      );
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    this.router.navigate(['auth/login']);
  }

  public forgotPassword(data: string): Observable<any>{
    return this.http.post(URLs.FORGOT_PASSWORD, {email: data, type: 'APP'});
  }

  public resendEmail(data: string): Observable<any>{
    return this.http.post<any>(URLs.RESEND_EMAIL, {email: data});
  }

  public resetPassword(password: Password): Observable<any>{
    return this.http.post<any>(URLs.RESET_PASSWORD, password);
  }

  /**
   * Submit registration request
   * @param {Credential} credential
   * @returns {Observable<any>}
   */
  // public register(credential: Credential): Observable<any> {
  // dummy token creation
  // credential = Object.assign({}, credential, {
  //   accessToken: 'access-token-' + Math.random(),
  //   refreshToken: 'access-token-' + Math.random(),
  //   roles: ['USER']
  // });
  // return this.http
  //   .post(this.API_URL + this.API_ENDPOINT_REGISTER, credential)
  //   .pipe(
  //     catchError(this.handleError('register', []))
  //   );
  // }

  /**
   * Submit forgot password request
   * @param {Credential} credential
   * @returns {Observable<any>}
   */
  // public requestPassword(credential: Credential): Observable<any> {
  // return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
  //   .pipe(catchError(this.handleError('forgot-password', []))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return from(result);
    };
  }

  /**
   * Save access data in the storage
   * @private
   * @param {AccessData} accessData
   */
  private saveAccessData(accessData: AccessData): void {
    if (typeof accessData !== 'undefined') {
      this.tokenStorage
        .setAccessToken(accessData.accessToken)
        .setRefreshToken(accessData.refreshToken)
        .setUserRoles(accessData.roles)
        .setUserInfo(accessData.userInfo);
      this.onCredentialUpdated$.next(accessData);
    }
  }
}
