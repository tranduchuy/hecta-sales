import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../../core/auth/auth.service';
import { Credential } from '../../../core/auth/credential';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { CookieService } from 'ngx-cookie-service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent extends PageBaseComponent implements OnInit {
  loginForm: FormGroup;
  isSuccess = true;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private fuseProgressBarService: FuseProgressBarService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _validatorService: ValidatorService,
    private _router: Router,
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
    this.loginForm = this._formBuilder.group({
      username: ['', this._validatorService.getInputRequired()],
      password: ['', this._validatorService.getInputRequired()]
    });
  }

  login(): void {
    this.fuseProgressBarService.show();
    console.log(this.loginForm.value);

    const credential: Credential = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    const sub = this._authService.login(credential).subscribe(res => {
      if (res.status === HTTP_CODES.SUCCESS) {
        this.isSuccess = true;
        this._router.navigate(['home']);
      } else {
        this.isSuccess = false;
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
