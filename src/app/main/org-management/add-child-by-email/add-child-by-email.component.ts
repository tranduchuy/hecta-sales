import { Component, OnInit } from '@angular/core';
import { OrgManagementService } from '../shared/service/org-management-service';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { ChildResponse } from '../shared/model/child.response';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';

@Component({
  selector: 'app-add-child-by-email',
  templateUrl: './add-child-by-email.component.html',
  styleUrls: ['./add-child-by-email.component.scss']
})
export class AddChildByEmailComponent extends PageBaseComponent implements OnInit {
  form: FormGroup;
  child: ChildResponse;
  isNotFound = false;

  constructor(private orgService: OrgManagementService,
              private validator: ValidatorService,
              private dialog: DialogService,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  onClickBtnSearch(): void {
    if (this.form.invalid) {
      return;
    }

    this.child = null;
    this.orgService.searchChildByEmail(this.form.value.email)
      .subscribe(res => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.child = res.data;
          this.isNotFound = false;
        } else {
          this.isNotFound = true;
        }
      });
  }

  onClickChoseChild(): void {
    const confirmMessage = 'Bạn có chắc muốn thêm người này thành tài khoản con?';
    const subDialog = this.dialog.openConfirm(confirmMessage)
      .subscribe((result: DialogResult) => {
        if (result === DialogResult.OK) {
          const subHttp = this.orgService.addExistedChild(this.child.id)
            .subscribe(res => {
              if (res.status === HTTP_CODES.SUCCESS) {
                const message = `Đã gửi lời mời đến tài khoản, vui lòng kiểm tra email: ${this.child.email}`;
                this.dialog.openInfo(message).subscribe().unsubscribe();
              } else {
                this.dialog.openWarning(res.message).subscribe().unsubscribe();
              }
            });

          this.subscriptions.push(subHttp);
        }
      });
    this.subscriptions.push(subDialog);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [this.validator.getEmailPattern(), this.validator.getInputRequired()]]
    });
  }

}
