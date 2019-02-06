import { Injectable } from '@angular/core';
import { IMessage } from './i-message';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MessageService {
  constructor(private translateService: TranslateService) {
    console.log(this.translateService);
  }

  get(id: string): IMessage {
    const content: string = this.getMessageFromLocale(id);

    return <IMessage>{
      content
    };
  }

  private getMessageFromLocale(id: string): string {
    return this.translateService.instant(id);
  }
}
