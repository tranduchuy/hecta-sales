import { Injectable } from '@angular/core';
import {IFileTextValue} from '../../components/image-uploader/image-uploader.component';

@Injectable()
export class StrService {
  public static guidGenerator(): string {
    const S4 = function () {
      return (((1 + Math.random()) * 0x10000) || 0).toString(32).substring(1);
    };
    return `${S4()}_${S4()}_${new Date().getTime()}`;
  }

  static mapIFileTextValue(value: Array<any>) {
    return value.map(intro => {
      return <IFileTextValue> {
        link: intro,
        isDemo: false
      };
    });
  }

  static mapDataImage(value: Array<any>) {
    return value.map(image => {
      return image.link
    });
  }
}
