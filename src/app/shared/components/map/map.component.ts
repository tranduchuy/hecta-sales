import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeoCodingApiService } from '../../services/geo-coding-api.service';
import {Observer} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})

export class MapComponent {
  _location = {
    latitude: 0,
    longitude: 0
  };

  _address = '';
  windowInfo = '';

  @Input()
  set address(value: string) {
    this._address = value;
    this._getCoordsFromAddress();
  }

  get address(): string {
    return this._address;
  }

  @Output() valueChanged = new EventEmitter<string>();

  constructor(private geoService: GeoCodingApiService) {}

  markerDragEnd(value: any) {
    this._getAddressFromCoords(value.coords);
  }

  private _getCoordsFromAddress() {
    try {
      this.geoService.findFromAddress(this._address)
        .subscribe((res: any) => {
          if (res.status === 'OK' && res.results && res.results.length > 0) {
            this._location.latitude = res.results[0].geometry.location.lat;
            this._location.longitude = res.results[0].geometry.location.lng;
            this.windowInfo = `<strong>Địa chỉ: </strong> ${this.address}`;
          }
        });
    }catch (e) {
      console.log(e);
    }
  }

  private _getAddressFromCoords(coords: any) {
    this._location.latitude = coords.lat;
    this._location.longitude = coords.lng;

    this.geoService.findFromLatLng(coords.lat, coords.lng)
      .subscribe(res => {
        if (res.status === 'OK' && res.results && res.results.length > 0) {
          this.address = res.results[0].formatted_address;
          this.windowInfo = `<strong>Địa chỉ: </strong> ${this.address}`;
          this.emitAddressByMarker();
        }
      });
  }

  private emitAddressByMarker() {
    this.valueChanged.emit(this.address);
  }
}

