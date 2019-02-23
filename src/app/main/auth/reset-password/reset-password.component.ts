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
import { DialogService } from 'app/shared/components/dialog/dialog.service';

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
            retypePassword: ['', [this.validatorService.getInputRequired(), confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('retypePassword').updateValueAndValidity();
            });
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
