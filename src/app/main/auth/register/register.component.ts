import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/core/auth/auth.service';
import { General } from 'app/shared/constants/general.constant';
import result from 'app/shared/constants/selector.constant';
import { RegisterConstants } from 'app/shared/constants/register.constant';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';

declare var grecaptcha: any;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RegisterComponent extends PageBaseComponent implements OnInit {
  form: FormGroup;
  registerForm: FormGroup;
  isCaptchaCheck: Boolean = false;
  isSuccess = true;

  cityItemsSource = result.cityDistrictProject;

  district: Array<any>;
  ward: Array<any>;

  siteKeyCaptcha = RegisterConstants.siteKeyCaptcha;

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
  ];

  inputDate = {
    minDay: new Date(1960, 1, 1).getTime(),
    maxDay: new Date(2005, 1, 1).getTime()
  };

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fb: FormBuilder,
    private _fuseProgressBarService: FuseProgressBarService,
    private _router: Router,
    private _validatorService: ValidatorService,
    private _dialog: DialogService,
    private _authService: AuthService,
  ) {
    super();
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._fuseProgressBarService.show();
    this.registerForm = this._fb.group({
      username: [null, Validators.compose(
        [this._validatorService.getInputRequired()],
      ), this._validatorService.getUsernameCheck()],
      email: [null, Validators.compose(
        [this._validatorService.getInputRequired(), this._validatorService.getEmailPattern()],
      ), this._validatorService.getEmailCheck()],
      password: ['', [this._validatorService.getInputRequired()]],
      phone: ['', [this._validatorService.getInputRequired()]],
      name: ['', [this._validatorService.getInputRequired()]],
      retypePassword: ['', [this._validatorService.getInputRequired(), confirmPasswordValidator]],
      gender: [1],
      district: ['', [this._validatorService.getInputRequired()]],
      ward: ['', [this._validatorService.getInputRequired()]],
      city: ['', [this._validatorService.getInputRequired()]],
      birth: ['', [this._validatorService.getInputRequired()]],
      type: [1]
    });

    grecaptcha.render('capcha_element', {
      'sitekey': this.siteKeyCaptcha
    });
    window['getResponceCapcha'] = this.getResponceCapcha.bind(this);

    const sub = this.registerForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        console.log('form value', value);
      });

    this.subscriptions.push(sub);
    this._fuseProgressBarService.hide();

  }

  onRadioChange(event: any): void {
    console.log('radio group change', event);
  }

  register(): void {
    this._fuseProgressBarService.show();

    const sub = this._authService.register(this.registerForm.value).subscribe(res => {
      if (res.status === HTTP_CODES.SUCCESS) {
        this.isSuccess = true;
        const subDialog = this._dialog.openInfo('Tài khoản của bạn đã đăng ký thành công. Vui lòng xác nhận email')
          .subscribe((_result: DialogResult) => {
            console.log('send mail success', _result);
          });
        this._router.navigate(['login']);
        this.subscriptions.push(subDialog);
      } else {
        this.isSuccess = false;
        const subDialog = this._dialog.openInfo('Tài khoản của bạn không được đăng ký. Vui lòng kiểm tra lại các thông tin chưa đúng')
          .subscribe((_result: DialogResult) => {
            console.log('send mail success', _result);
          });
        this.subscriptions.push(subDialog);
      }
      this._fuseProgressBarService.hide();
    }, err => {
      console.error(err);
      this.isSuccess = false;
      this._fuseProgressBarService.hide();
    });

    this.subscriptions.push(sub);
  }

  onChangeCity(code): void {
    this.ward = [];
    this.district = result.cityDistrictProject.find(city => city.code == code).district;
  }

  onChangeWard(id): void {
    this.ward = this.district.find(ward => ward.id == id).ward;
  }

  getResponceCapcha(captchaResponse: string): void {
    this.verifyCaptcha(captchaResponse);
  }

  verifyCaptcha(captchaResponse: string): void {
    this.isCaptchaCheck = true;
    this._dialog.openInfo(captchaResponse)
      .subscribe((_result: DialogResult) => {
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
