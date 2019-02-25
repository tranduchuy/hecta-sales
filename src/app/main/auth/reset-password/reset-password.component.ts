import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { Password } from 'app/core/auth/password';

@Component({
    selector     : 'reset-password',
    templateUrl  : './reset-password.component.html',
    styleUrls    : ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPasswordComponent extends PageBaseComponent implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;
    isSuccess = true;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private fuseProgressBarService: FuseProgressBarService,
      private authService: AuthService,
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
        this.resetPasswordForm = this._formBuilder.group({
            password       : ['', [this.validatorService.getInputRequired()]],
            confirmedPassword: ['', [this.validatorService.getInputRequired(), confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('retypePassword').updateValueAndValidity();
            });
    }

    resetPassword(): void
    {
      this.fuseProgressBarService.show();

      const password: Password = {
        password: this.resetPasswordForm.controls.password.value,
        confirmedPassword: this.resetPasswordForm.controls.confirmedPassword.value
      };
  
      const subHttp = this.authService.resetPassword(password).subscribe(
        (res: any) => {
          if (res.status === 1) {
            this.isSuccess = true;
            this.router.navigate(['login']);
            console.log(res);
            const subDialog = this.dialog.openInfo('Tài khoản của bạn đã được thay đổi thành công. Chuyển đến trang đăng nhập trong giây lát')
              .subscribe((result: DialogResult) => {
                console.log('send mail success', result);
              });
              this.subscriptions.push(subDialog);

          } else {
            this.isSuccess = false;
            console.log(res);
            const subDialog = this.dialog.openInfo('Mật khẩu của bạn không đúng. Xin nhập lại')
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

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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
