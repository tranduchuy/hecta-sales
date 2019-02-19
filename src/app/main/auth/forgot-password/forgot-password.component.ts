import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {

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
    private router: Router
  )
  {
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
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword(): void{
    this.fuseProgressBarService.show();

    let email = this.forgotPasswordForm.controls.email.value;

    this.authService.forgotPassword(email).subscribe(
      (res:any)=>{
        if (res.status === 1) {
          this.isSuccess = true;
          this.router.navigate(['sample']);
          alert('Tài khoản của bạn đã được gửi yêu cầu lấy lại. Chờ trong giây lát')
        } else {
          this.isSuccess = false;
          alert('Tài khoản của bạn cần lấy lại không tồn tại hoặc không đúng. Xin hãy nhập lại')
        }
        this.fuseProgressBarService.hide();
      }, err => {
        console.error(err);
        this.isSuccess = false;
        this.fuseProgressBarService.hide();
      });
    }
  }
  