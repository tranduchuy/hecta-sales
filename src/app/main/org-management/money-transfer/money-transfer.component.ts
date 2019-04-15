import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgManagementService } from '../shared/service/org-management-service';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../shared/components/dialog/dialog.service';
import { ChildResponse } from '../shared/model/child.response';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { UserService } from '../../user-management/shared/service/user.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss']
})
export class MoneyTransferComponent extends PageBaseComponent implements OnInit {

  form: FormGroup;
  childDetails: ChildResponse;
  currentUser: any;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: DialogService,
              private userService: UserService,
              private fuseProgressBarService: FuseProgressBarService,
              private orgService: OrgManagementService) {
    super();
    this.initForm();

    const subParam = this.route.params.subscribe(params => {
      const id = +params.id;
      if (id) {
        this.loadChildDetail(id);
      }
    });
    this.subscriptions.push(subParam);

    this.loadUserInfo();
  }

  ngOnInit() {
  }

  onClickBtnTransfer(): void {
    console.log(this.form.value.amount);
    const amount = +this.form.value.amount;
    if (amount < 1000) {
      this.dialog.openWarning('Số tiền phải lớn hơn hoặc bằng 1000 VND').subscribe().unsubscribe();
      return;
    }
    this.fuseProgressBarService.show();
    const subHttp = this.orgService.transfer(this.childDetails.id, {amount: amount, note: ''})
      .subscribe(res => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.dialog.openInfo('Chuyển khoản thành công').subscribe().unsubscribe();
          this.loadUserInfo();
          this.fuseProgressBarService.hide();
        } else {
          this.dialog.openWarning(res.message).subscribe().unsubscribe();
        }
      });
    this.subscriptions.push(subHttp);
  }

  private loadUserInfo(): void {
    this.userService.getUserInfoLoggedIn().then(res => {
      if (res.status === HTTP_CODES.SUCCESS) {
        this.currentUser = res.data.user;
      }
    });
  }

  private loadChildDetail(id: number): void {
    const sub = this.orgService.getChildDetails(id)
      .subscribe(res => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.childDetails = res.data;
        }
      });
    this.subscriptions.push(sub);
  }

  private initForm(): void {
    this.form = this.fb.group({
      amount: [null]
    });
  }
}
