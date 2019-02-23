import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/core/auth/auth.service';
import { User } from 'app/core/auth/user';
import { General } from 'app/shared/constants/general.constant';
import result from 'app/shared/constants/selector.constant';

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
    isSuccess = true;

    cityItemsSource = result.cityDistrictProject;

    district: Array<any>;
    ward: Array<any>;

    siteKeyCaptcha: string = "6LeyxX8UAAAAAOIGTpptvlMs6prD9zY7iSCxYEBb";

    genderItemsSource = [
      {
        name: 'Nữ',
        value: General.Gender.GENDER_FEMALE
      },
      {
        name: 'Nam',
        value: General.Gender.GENDER_MALE
      }
    ];

    typeItemsSource = [
      {
        name: 'Cá nhân',
        value: General.Type.TYPE_PERSONAL
      },
      {
        name: 'Doanh nghiệp',
        value: General.Type.TYPE_BUSINESS
      }
    ]

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
      private _fuseConfigService: FuseConfigService,
      private fb: FormBuilder,
      private fuseProgressBarService: FuseProgressBarService,
      private router: Router,
      private validatorService: ValidatorService,
      private dialog: DialogService,
      private authService: AuthService
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
        district: ['', [this.validatorService.getInputRequired()]],
        ward: ['',[this.validatorService.getInputRequired()]],
        city: ['', [this.validatorService.getInputRequired()]],
        // birth: [null, [this.validatorService.getInputRequired()]],
        type: [1]
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

    register(): void {
      this.fuseProgressBarService.show();
  
      const user: User = {
        username: this.registerForm.controls.username.value,
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
        retypePassword: this.registerForm.controls.retypePassword.value,
        // birth: Date;
        phone: this.registerForm.controls.phone.value,
        name: this.registerForm.controls.name.value,
        gender: this.registerForm.controls.gender.value,
        city: this.registerForm.controls.city.value,
        district: this.registerForm.controls.district.value,
        ward: this.registerForm.controls.ward.value,
        type: this.registerForm.controls.type.value,
      };

      console.log(user);
  
      const sub = this.authService.register(user).subscribe(res => {
        if (res.status === 1) {
          this.isSuccess = true;
          this.dialog.openInfo('Tài khoản của bạn đã đăng ký thành công. Vui lòng xác nhận email')
            .subscribe((result: DialogResult) => {
              console.log('send mail success', result);
            });
          this.router.navigate(['login']);
        } else {
          this.isSuccess = false;
          this.dialog.openInfo('Tài khoản của bạn không được đăng ký. Vui lòng kiểm tra lại các thông tin chưa đúng')
            .subscribe((result: DialogResult) => {
              console.log('send mail success', result);
            });
          console.log(res);
        }
        this.fuseProgressBarService.hide();
      }, err => {
        console.error(err);
        this.isSuccess = false;
        this.fuseProgressBarService.hide();
      });

      this.subscriptions.push(sub);
    }

    onChangeCity(code): void
    {
      this.ward = [];
      this.district = result.cityDistrictProject.find(city => city.code == code).district
      console.log(this.district);
    }

    onChangeWard(id): void
    {
      this.ward = this.district.find(ward => ward.id == id).ward;
      console.log(this.ward);
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
    }
    
    verifyCaptcha(captchaResponse: string) {
      this.isCaptchaCheck = true;
      this.dialog.openInfo(captchaResponse)
            .subscribe((result: DialogResult) => {
              console.log('send mail success', result);
            });
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
    const retypePassword = control.parent.get('retypePassword');

    if ( !password || !retypePassword )
    {
        return null;
    }

    if ( retypePassword.value === '' )
    {
        return null;
    }

    if ( password.value === retypePassword.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
