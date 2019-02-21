import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { DialogService } from 'app/shared/components/dialog/dialog.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
declare var grecaptcha: any;

@Component({
    selector     : 'register',
    templateUrl  : './register.component.html',
    styleUrls    : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterComponent extends PageBaseComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    isCaptchaCheck: Boolean = false;

    siteKeyCaptcha: string = "6LeyxX8UAAAAAOIGTpptvlMs6prD9zY7iSCxYEBb";

    radioGroupItemsSource = [
      {
        name: 'Nữ',
        value: 0
      },
      {
        name: 'Nam',
        value: 1
      }
    ];

    radioGroupTypeItemsSource = [
      {
        name: 'Cá nhân',
        value: 0
      },
      {
        name: 'Doanh nghiệp',
        value: 1
      }
    ]

    cityItemsSource = [
      {
        name: 'Ho Chi Minh',
        value: 'hcm'
      },
      {
        name: 'Ha Noi',
        value: 'hn'
      }
    ];

    districtsItemsSource = [
      {
        name: 'Ho Chi Minh',
        value: 'hcm'
      },
      {
        name: 'Ha Noi',
        value: 'hn'
      }
    ];

    wardsItemsSource = [
      {
        name: 'Ho Chi Minh',
        value: 'hcm'
      },
      {
        name: 'Ha Noi',
        value: 'hn'
      }
    ];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
      private _fuseConfigService: FuseConfigService,
      private fb: FormBuilder,
      private router: Router,
      private validatorService: ValidatorService,
      private dialog: DialogService,
  )
  {
      super();
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
              navbar   : {
                  hidden: true
              },
              toolbar  : {
                  hidden: true
              },
              footer   : {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              }
          }
      };

      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.registerForm = this.fb.group({
        username: ['', [this.validatorService.getInputRequired()]],
        email: ['', [this.validatorService.getInputRequired(), this.validatorService.getEmailPattern()]],
        password: ['', [this.validatorService.getInputRequired()]],
        phone: ['',[this.validatorService.getInputRequired()]],
        name: ['',[this.validatorService.getInputRequired()]],
        retypePassword: ['',[this.validatorService.getInputRequired()]],
        gender: [0],
        district: [187, [this.validatorService.getInputRequired()]],
        ward: [4801,[this.validatorService.getInputRequired()]],
        city: ['CM', [this.validatorService.getInputRequired()]],
        // birth: [null, [this.validatorService.getInputRequired()]],
        type: [1],
        isCaptchaCheck: true
      });

      this.registerForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        console.log('form value', value);
      });

      grecaptcha.render('capcha_element', {
        'sitekey': this.siteKeyCaptcha
      });
      window['getResponceCapcha'] = this.getResponceCapcha.bind(this);
    }

    onRadioChange(event: any): void {
      console.log('radio group change', event);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getResponceCapcha(captchaResponse: string) {
      this.verifyCaptcha(captchaResponse);
      this.isCaptchaCheck = true;
    }
    
    verifyCaptcha(captchaResponse: string) {
      alert(captchaResponse);
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
