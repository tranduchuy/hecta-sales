import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import { environment } from "environments/environment";
import { URLs } from "app/shared/constants/url.constant";
import { catchError, map, tap, delay, switchMap } from 'rxjs/operators';

@Injectable()
export class CheckValidatorService {
    constructor(private http: HttpClient) { }
    public checkUser(data: string): Observable<any> {
        return timer(1000)
            .pipe(
                switchMap(() => {
                    // Check if username is available
                    return this.http.post<any>(environment.apiEndpoint + URLs.CHECK, { username: data })
                })
            );
    }

    public checkEmail(data: string): Observable<any> {
        return timer(1000)
            .pipe(
                switchMap(() => {
                    // Check if email is available
                    return this.http.post<any>(environment.apiEndpoint + URLs.CHECK, { email: data })
                })
            );
    }
}