import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLs } from '../../../../shared/constants/url.constant';
import { ChildRequest } from '../model/child.request';

@Injectable({
  providedIn: 'root'
})
export class OrgManagementService {
  constructor(private _http: HttpClient) {
  }

  getChildList(): Observable<any> {
    return this._http.get(URLs.OrgManagement.ChildList);
  }

  addChild(newChild: ChildRequest): Observable<any> {
    return this._http.post(URLs.OrgManagement.AddNewChild, newChild);
  }

  addExistedChild(id: number): Observable<any> {
    return this._http.post(URLs.OrgManagement.AddExisedChild + '/' + id, {});
  }

  searchChildByEmail(email: string): Observable<any> {
    return this._http.get(URLs.OrgManagement.FindByEmail + '/' + email);
  }

  deleteChildById(id: number): Observable<any> {
    return this._http.post(URLs.OrgManagement.DeleteChild + '/' + id, {});
  }
}
