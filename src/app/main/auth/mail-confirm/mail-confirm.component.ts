import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { DialogResult, DialogService } from 'app/shared/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidatorService } from 'app/shared/services/validators/validator.service';

@Component({
  selector: 'mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MailConfirmComponent extends PageBaseComponent implements OnInit {

  mailConfirmForm: FormGroup;
  email;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fb: FormBuilder,
    private _validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router,
    private fuseProgressBarService: FuseProgressBarService,
    private dialog: DialogService,
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mailConfirmForm = this._fb.group({
      email: ['', [this._validatorService.getInputRequired(), this._validatorService.getEmailPattern()]]
    })
  }

  resend(): void {
    this.fuseProgressBarService.show();
    const sub = this.authService.resendEmail(this.mailConfirmForm.controls.email.value).subscribe(res => {
      if(res.status == 1 ){
        const subDialog = this.dialog.openInfo('Tài khoản của bạn đã được gửi lại email xác nhận. Vui lòng kiểm tra lại hộp thư')
        .subscribe((result: DialogResult) => {
          console.log('send mail success', result);
        });
        this.router.navigate(['/auth/login']);
        this.subscriptions.push(subDialog);
      }
      else if(res.message === "User have already been active"){
        const subDialog = this.dialog.openInfo('Tài khoản của bạn đã được gửi lại email xác nhận. Vui lòng kiểm tra lại hộp thư')
        .subscribe((result: DialogResult) => {
          console.log('send mail success', result);
        });
        this.router.navigate(['/auth/login']);
        this.subscriptions.push(subDialog);
      }
      else{
        const subDialog = this.dialog.openInfo('Vui lòng nhập đúng thông tin')
        .subscribe((result: DialogResult) => {
          console.log('send mail success', result);
        });
        this.subscriptions.push(subDialog);
      }
      this.fuseProgressBarService.hide();
    }, err => {
      console.error(err);
      this.fuseProgressBarService.hide();
    });
    this.subscriptions.push(sub);
  }
}
