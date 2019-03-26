import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { MessageService } from '../message/message.service';
import { ValidatorCore } from './validator-core.service';
import { AuthService } from 'app/core/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

export namespace ErrorNames {
  export const required = ['required', 'Bắt buộc'];
  export const patternUrl = ['patternUrl', 'Url sai'];
  export const patternNumber = ['patternNumber', 'Chỉ được phéo nhập số'];
  export const patternHotlineNumber = ['patternHotlineNumber', 'Chỉ được phéo nhập số và khoảng trắng'];
  export const fileNotLoad = ['fileNotLoad', 'Chưa có file'];
  export const minLength = ['minLength', 'Quá ngắn'];
  export const maxLength = ['maxLength', 'Quá dài'];
  export const minNumberValue = ['minNumberValue', 'Quá thấp'];
  export const maxNumberValue = ['maxMaxNumber', 'Quá cao'];
  export const slug = ['slug', 'Slug sai'];
  export const areStoreSelected = ['areaStore', 'Chưa chọn store nào'];
}

@Injectable()
export class ValidatorService {
  constructor(
    private messageService: MessageService,
    private authService: AuthService) {
  }

  private core: ValidatorCore = new ValidatorCore();

  public getInputRequired(): ValidatorFn {
    return (ctl: AbstractControl): ValidationErrors => {
      const ERR_REQUIRED = 'ERRORS.100';

      return this.core.requiredValidator(
        {
          validRequired: {errCode: ERR_REQUIRED}
        },
        ctl.value,
        this.messageService
      );
    };
  }

  public getUsernameCheck(): AsyncValidatorFn {
    return (ctl: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.authService.checkUser(ctl.value)
        .pipe(
          map(res => {
            if (!res.data) {
              return {'exists': true}
            }
          })
        )
    }
  }

  public getEmailCheck(): AsyncValidatorFn {
    return (ctl: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.authService.checkEmail(ctl.value)
        .pipe(
          map(res => {
            if (!res.data) {
              return {'exists': true}
            }
          })
        )
    }
  }

  public getEmailPattern(): ValidatorFn {
    const EMAIL_PATTERN = '(?=^([A-Za-z0-9!-\\/:-@\\[-`{-~]+)$)(?=^([^ @]+)@(([^ @.]+\\.)+[^ @.]{2,})$)';
    return (ctl: AbstractControl): ValidationErrors => {
      const ERR_EMAIL_PATTERN = 'ERRORS.101';

      return this.core.requiredValidator(
        {
          validReguEx: {pattern: EMAIL_PATTERN, errCode: ERR_EMAIL_PATTERN}
        },
        ctl.value,
        this.messageService
      );
    };
  }

  public confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
      return null;
    }

    const password = control.parent.get('password');
    const retypePassword = control.parent.get('retypePassword');

    if (!password || !retypePassword) {
      return null;
    }

    if (retypePassword.value === '') {
      return null;
    }

    if (password.value === retypePassword.value) {
      return null;
    }

    return {'passwordsNotMatching': true};

  };
}
