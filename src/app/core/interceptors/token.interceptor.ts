import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_CODES } from '../../shared/constants/http-code.constant';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private cookieService: CookieService) {

  }

  private _isUrlApi(url: string): boolean {
    return url.indexOf(environment.apiEndpoint) !== -1;
  }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._isUrlApi(request.url)) {
      // modify request
      request = request.clone({
        setHeaders: {
          accesstoken: `${this.cookieService.get('accessToken')}`
        }
      });

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              if (event.body.status === HTTP_CODES.ERROR_AUTHORIZED) {
                this.router.navigate(['auth/login']);
              }
            }
          },
          error => {
            // http response status code
            if (error.status === HTTP_CODES.ERROR_AUTHORIZED) {
              this.router.navigate(['auth/login']);
            }
          }
        )
      );
    }
    return next.handle(request);
  }
}
