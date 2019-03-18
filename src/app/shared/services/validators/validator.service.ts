import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { MessageService } from '../message/message.service';
import { ValidatorCore } from './validator-core.service';
import { AuthService } from 'app/core/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

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
