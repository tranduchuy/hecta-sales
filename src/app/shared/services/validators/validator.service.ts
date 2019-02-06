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
}
