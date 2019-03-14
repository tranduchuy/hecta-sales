import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';

@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent extends PageBaseComponent implements OnInit {

  isSuccess: Boolean = true;

  passwordForm: FormGroup;

  constructor(
    private fuseProgressBarService: FuseProgressBarService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private validatorService: ValidatorService,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [this.validatorService.getInputRequired()]],
      password: ['', this.validatorService.getInputRequired()],
      confirmedPassword: ['', this.validatorService.getInputRequired()]
    });
  }

  updatePassword(): void {
    this.fuseProgressBarService.show();
    const subHttp = this.userService.updatePassword(this.passwordForm.value).subscribe(
      res => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.isSuccess = true;
          const subDialog = this.dialog.openInfo('Cập nhật tài khoản thành công')
            .subscribe((result: DialogResult) => {
              console.log('update password success', result);
            });
          this.router.navigate(['user/me']);
          this.subscriptions.push(subDialog);
        } else {
          this.isSuccess = false;
          const subDialog = this.dialog.openInfo('Vui lòng nhập chính xác mật khẩu của bạn')
            .subscribe((result: DialogResult) => {
              console.log('update password fail', result);
            });
          this.subscriptions.push(subDialog);
        }
        this.fuseProgressBarService.hide();
      }, err => {
        console.error(err);
        this.isSuccess = false;
        this.fuseProgressBarService.hide();
      });
    this.subscriptions.push(subHttp);
  }
}
