import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ForgotPasswordComponent extends PageBaseComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSuccess = true;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private fuseProgressBarService: FuseProgressBarService,
    private authService: AuthService,
    private router: Router,
    private validatorService: ValidatorService,
    private dialog: DialogService,
  ) {
    // Configure the layout
    super();
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
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [this.validatorService.getInputRequired(), this.validatorService.getEmailPattern()]]
    });
  }

  forgotPassword(): void {
    this.fuseProgressBarService.show();

    let email = this.forgotPasswordForm.controls.email.value;

    this.authService.forgotPassword(email).subscribe(
      (res: any) => {
        if (res.status === 1) {
          this.isSuccess = true;
          this.router.navigate(['sample']);
          this.dialog.openInfo('Tài khoản của bạn đã được gửi yêu cầu lấy lại. Chờ trong giây lát')
            .subscribe((result: DialogResult) => {
              console.log('send mail success', result);
            });
        } else {
          this.isSuccess = false;
          this.dialog.openInfo('Tài khoản của bạn cần lấy lại không tồn tại hoặc không đúng. Xin hãy nhập lại')
            .subscribe((result: DialogResult) => {
              console.log('send mail fail', result);
            });
        }
        this.fuseProgressBarService.hide();
      }, err => {
        console.error(err);
        this.isSuccess = false;
        this.fuseProgressBarService.hide();
      });
  }
}
