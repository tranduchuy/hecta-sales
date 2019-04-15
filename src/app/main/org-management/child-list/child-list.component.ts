import { Component, OnInit } from '@angular/core';
import { OrgManagementService } from '../shared/service/org-management-service';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { ChildResponse } from '../shared/model/child.response';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { Router } from '@angular/router';
import { ChildStatus } from '../shared/child-status';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent extends PageBaseComponent implements OnInit {

  childList: ChildResponse[] = [];
  form: FormGroup;
  searchedChild: ChildResponse;
  CHILD_STATUS = ChildStatus;

  constructor(private orgService: OrgManagementService,
              private fb: FormBuilder,
              private validator: ValidatorService,
              private fuseProgressBarService: FuseProgressBarService,
              private router: Router,
              private dialog: DialogService) {
    super();
    this.initForm();
  }

  ngOnInit() {
    this.onClickBtnSearch();
    // this.loadAllChild();
  }

  onClickBtnSearch(): void {
    this.searchedChild = null;
    this.childList = [];
    if (this.form.value.email) {
      this.searchChild();
    } else {
      this.loadAllChild();
    }
  }

  onClickBtnTransfer(id: number): void {
    this.router.navigate(['/quan-ly-tai-khoan-doanh-nghiep/chuyen-khoan', id]);
  }

  onClickBtnDelete(id: number): void {
    const confirmMessage = 'Bạn có chắc muốn xóa tài khoản con này?';
    const successMessage = 'Bạn đã xóa tài khoản con thành công.';

    const subDialog = this.dialog.openConfirm(confirmMessage)
      .subscribe((result: DialogResult) => {

        if (result === DialogResult.OK) {
          this.fuseProgressBarService.show();

          this.orgService.deleteChildById(id).subscribe(res => {
            this.fuseProgressBarService.hide();

            if (res.status === HTTP_CODES.SUCCESS) {
              this.dialog.openInfo(successMessage).subscribe().unsubscribe();
              this.ngOnInit();
            } else {
              this.dialog.openWarning(res.message).subscribe().unsubscribe();
            }
          });
        }
      });

    this.subscriptions.push(subDialog);
  }

  private loadAllChild(): void {
    this.fuseProgressBarService.show();
    const httpSub = this.orgService.getChildList().subscribe(res => {
      this.fuseProgressBarService.hide();
      if (res.status === HTTP_CODES.SUCCESS) {
        this.childList = res.data;
      } else {
        this.dialog.openWarning(res.message).subscribe().unsubscribe();
      }
    });
    this.subscriptions.push(httpSub);
  }

  private searchChild(): void {
    this.fuseProgressBarService.show();
    const sub = this.orgService.searchChildByEmail(this.form.value.email)
      .subscribe(res => {
        this.fuseProgressBarService.hide();
        if (res.status === HTTP_CODES.SUCCESS) {
          this.searchedChild = res.data;
        }
      });
    this.subscriptions.push(sub);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['']
    });
  }
}
