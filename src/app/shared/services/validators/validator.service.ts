import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from '../message/message.service';
import { ValidatorCore } from './validator-core.service';

@Injectable()
export class ValidatorService {
  constructor(private messageService: MessageService) {}

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

    return { 'passwordsNotMatching': true };

};
}
