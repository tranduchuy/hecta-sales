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
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';

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

    const email = this.forgotPasswordForm.controls.email.value;

    const sub = this.authService.forgotPassword(email).subscribe(
      (res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.isSuccess = true;
          this.router.navigate(['login']);
          this.dialog.openInfo('T??i kho???n c???a b???n ???? ???????c g???i y??u c???u l???y l???i. Ch??? trong gi??y l??t')
            .subscribe((result: DialogResult) => {
              console.log('send mail success', result);
            });
        } else {
          this.isSuccess = false;
          this.dialog.openInfo('T??i kho???n c???a b???n c???n l???y l???i kh??ng t???n t???i ho???c kh??ng ????ng. Xin h??y nh???p l???i')
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

      this.subscriptions.push(sub);
  }

}
