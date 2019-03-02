import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class UserDetailComponent extends PageBaseComponent implements OnInit {

  isSuccess: Boolean = true;

  userForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fuseProgressBarService: FuseProgressBarService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private validatorService: ValidatorService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [this.validatorService.getInputRequired()]],
      password: ['', this.validatorService.getInputRequired()],
      confirmedPassword: ['', this.validatorService.getInputRequired()]
    })
  }

  updatePassword(): void {
    this.fuseProgressBarService.show();
    const subHttp = this.userService.updatePassword(this.passwordForm.value).subscribe(
      res => {
        if (res.status === 1) {
          this.isSuccess = true;
          const subDialog = this.dialog.openInfo('Cập nhật tài khoản thành công')
            .subscribe((result: DialogResult) => {
              console.log('update password success', result);
            });
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
