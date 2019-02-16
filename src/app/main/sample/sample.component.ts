import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  itemsSource: any = [];

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private http: HttpClient
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    this.http.get('http://159.89.202.248:3000/api/v1/posts/list?postType=1').subscribe((res: any) => {
      this.itemsSource = res.data.items;
    });
  }
}
