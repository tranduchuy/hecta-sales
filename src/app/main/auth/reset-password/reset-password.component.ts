import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { Password } from 'app/core/auth/password';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';

@Component({
    selector     : 'reset-password',
    templateUrl  : './reset-password.component.html',
    styleUrls    : ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPasswordComponent extends PageBaseComponent implements OnInit
{
    resetPasswordForm: FormGroup;
    isSuccess = true;

    constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private fuseProgressBarService: FuseProgressBarService,
      private authService: AuthService,
      private router: Router,
      private validatorService: ValidatorService,
      private dialog: DialogService,
      private activatedRoute: ActivatedRoute
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.fuseProgressBarService.show();
        this.resetPasswordForm = this._formBuilder.group({
            password       : ['', [this.validatorService.getInputRequired()]],
            confirmedPassword: ['', [this.validatorService.getInputRequired(), confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        const sub = this.resetPasswordForm.get('password').valueChanges
            .subscribe(() => {
                this.resetPasswordForm.get('confirmedPassword').updateValueAndValidity();
            });
        this.subscriptions.push(sub);
        this.fuseProgressBarService.hide();
    }

    resetPassword(): void
    {
      this.fuseProgressBarService.show();

      const password: Password = {
        resetToken: this.activatedRoute.snapshot.paramMap.get('token'),
        password: this.resetPasswordForm.controls.password.value,
        confirmedPassword: this.resetPasswordForm.controls.confirmedPassword.value,
        type: 'APP'
      };
  
      const subHttp = this.authService.resetPassword(password).subscribe(
        (res: any) => {
          if (res.status === HTTP_CODES.SUCCESS) {
            this.isSuccess = true;
            this.router.navigate(['login']);
            const subDialog = this.dialog.openInfo('T??i kho???n c???a b???n ???? ???????c thay ?????i th??nh c??ng. Chuy???n ?????n trang ????ng nh???p trong gi??y l??t')
              .subscribe((result: DialogResult) => {
                console.log('send mail success', result);
              });
              this.subscriptions.push(subDialog);

          } else {
            this.isSuccess = false;
            const subDialog = this.dialog.openInfo('M???t kh???u c???a b???n kh??ng ????ng. Xin nh???p l???i')
              .subscribe((result: DialogResult) => {
                console.log('send mail fail', result);
              });
              this.subscriptions.push(subDialog);
          }
          this.subscriptions.push(subHttp);
          this.fuseProgressBarService.hide();
        }, err => {
          console.error(err);
          this.isSuccess = false;
          this.fuseProgressBarService.hide();
        });
  
        this.subscriptions.push(subHttp);
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
  const confirmedPassword = control.parent.get('confirmedPassword');

  if ( !password || !confirmedPassword )
  {
      return null;
  }

  if ( confirmedPassword.value === '' )
  {
      return null;
  }

  if ( password.value === confirmedPassword.value )
  {
      return null;
  }

  return {'passwordsNotMatching': true};
};
