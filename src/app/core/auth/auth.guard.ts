import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private _router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
    
  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(isDevMode()){
      this._router.navigate(['/auth/login']);
      return true;
    }
    return false;
  }
}
