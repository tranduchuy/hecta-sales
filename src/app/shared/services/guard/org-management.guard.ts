import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../main/user-management/shared/service/user.service';
import { map } from 'rxjs/operators';
import { General } from '../../constants/general.constant';
import { HTTP_CODES } from '../../constants/http-code.constant';
import TYPE_BUSINESS = General.Type.TYPE_BUSINESS;

@Injectable()
export class OrgManagementGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUser().pipe(
      map(res => {
        if (res.status === HTTP_CODES.SUCCESS) {
          return res.data.user.type === TYPE_BUSINESS;
        }
        return false;
      })
    );
  }
}
