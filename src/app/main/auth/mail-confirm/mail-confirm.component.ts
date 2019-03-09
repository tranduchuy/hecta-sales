import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'app/core/auth/auth.service';
import { DialogResult, DialogService } from 'app/shared/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';

@Component({
  selector: 'mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MailConfirmComponent extends PageBaseComponent implements OnInit {
  email;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private cookieService: CookieService,
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
    this.email = this.cookieService.get('email');
  }

  resend(): void {
    const sub = this.authService.resendEmail(this.email).subscribe(res => {
      const subDialog = this.dialog.openInfo('Tài khoản của bạn đã được gửi lại email xác nhận. Vui lòng kiểm tra lại hộp thư')
        .subscribe((result: DialogResult) => {
          console.log('send mail success', result);
        });
      this.router.navigate(['login']);
      this.subscriptions.push(subDialog);
      this.fuseProgressBarService.hide();
    }, err => {
      console.error(err);
      this.fuseProgressBarService.hide();
    });
    this.subscriptions.push(sub);
    this.cookieService.delete('email');
  }
}
