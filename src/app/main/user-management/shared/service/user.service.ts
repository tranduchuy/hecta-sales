import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UpdatePassword } from '../model/update-password';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { URLs } from 'app/shared/constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    ) {}

  public updatePassword(updatePassword: UpdatePassword): Observable<any>{
    return this.httpClient.post<any>(environment.apiEndpoint + URLs.USER, updatePassword)
  }
  
}
