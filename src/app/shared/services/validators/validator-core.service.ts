import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { ValidationErrors } from '@angular/forms';

@Injectable()
export class ValidatorCore {
  public isRequireValid(value: any): boolean {
    return !this.nullOrEmpty(value);
  }

  public requiredValidator(funcSetting: { validRequired?: { errCode: string }, validReguEx?: { errCode: string, pattern: string } },
                           value: any,
                           messageService: MessageService): ValidationErrors {
    const response: ValidationErrors = {};

    if (funcSetting.validRequired && !this.isRequireValid(value)) {
      response[funcSetting.validRequired.errCode] = messageService.get(funcSetting.validRequired.errCode).content;
    }

    if (funcSetting.validReguEx
      && !this.isRegExpValid(value, funcSetting.validReguEx.pattern)) {
      response[funcSetting.validReguEx.errCode] = messageService.get(funcSetting.validReguEx.errCode).content;
    }

    return response;
  }

  private nullOrEmpty(value: any): boolean {
    // Undefined
    if (value === undefined) {
      return true;
    }
    // Null
    if (value === null) {
      return true;
    }

    // Empty string
    if (typeof value === 'string') {
      return value === '';
    }

    // Empty array
    if (value instanceof Array) {
      return value.length === 0;
    }

    return false;
  }

  public isRegExpValid(value: string, pattern: string): boolean {
    return (new RegExp(pattern).test(value));
  }
}
