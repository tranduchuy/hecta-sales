import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../../core/auth/auth.service';
import { Credential } from '../../../core/auth/credential';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { ValidatorService } from 'app/shared/services/validators/validator.service';

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
    private authServie: AuthService,
    private validatorService: ValidatorService,
    private router: Router,
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
      username: ['', this.validatorService.getInputRequired()],
      password: ['', this.validatorService.getInputRequired()]
    });
  }

  login(): void {
    this.fuseProgressBarService.show();

    const credential: Credential = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    const sub = this.authServie.login(credential).subscribe(res => {
      if (res.status === 1) {
        this.isSuccess = true;
        this.router.navigate(['sample']);
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
