import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';
import { GeoCodingApiService } from '../../services/geo-coding-api.service';
import { MapComponent } from './map.component';


@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapToken
    })
  ],
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: [
    GeoCodingApiService
  ]
})

export class MapModule {

}
