import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {URLs} from '../../../shared/constants/url.constant';

@Injectable()
export class ListSalePostService implements Resolve<any>
{
    posts: any[];
    onPostsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onPostsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-products')
                .subscribe((response: any) => {
                    this.posts = response;
                    this.onPostsChanged.next(this.posts);
                    resolve(response);
                }, reject);
        });
    }

    getList(params: any): Observable<any> {
      return this._httpClient.get(URLs.Post.listPost, {params: params});
    }

  upNew(id: any): Observable<any> {
      const url =  URLs.upNew.replace('{id}', id);
      console.log(url);
    return this._httpClient.post(url, {id: id});
  }

  updateAdStatus(id: any, status: any): Observable<any> {
    const url =  URLs.updateAdStatus.replace('{id}', id);
    return this._httpClient.post(url, {id: id, adStatus: status});
  }
}
