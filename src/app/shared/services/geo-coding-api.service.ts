import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class GeoCodingApiService {
  API_URL: string;

  constructor(private httpClient: HttpClient,
              @Inject('API_GOOGLE_MAP_TOKEN') key) {
    this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}`;
  }

  findFromLatLng(lat: number, lng: number): Observable<any> {
    const coords = [lat, lng];
    const url = `${this.API_URL}&latlng=${coords.join(',')}`;

    return this.httpClient.get(url);
  }

  findFromAddress(address: string,
                  postalCode?: string,
                  place?: string,
                  province?: string,
                  region?: string,
                  country?: string): Observable<any> {
    const compositeAddress = [address];

    if (postalCode) {
      compositeAddress.push(postalCode);
    }

    if (place) {
      compositeAddress.push(place);
    }

    if (province) {
      compositeAddress.push(province);
    }

    if (region) {
      compositeAddress.push(region);
    }

    if (country) {
      compositeAddress.push(country);
    }

    const url = `${this.API_URL}&address=${compositeAddress.join(',')}`;
    return this.httpClient.get(url);
  }
}
