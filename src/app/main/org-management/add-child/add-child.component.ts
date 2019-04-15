import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import result from '../../../shared/constants/selector.constant';
import { General } from '../../../shared/constants/general.constant';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { OrgManagementService } from '../shared/service/org-management-service';
import { ChildRequest } from '../shared/model/child.request';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent extends PageBaseComponent implements OnInit {
  form: FormGroup;
  isSuccess = true;

  cityItemsSource = result.cityDistrictProject;
  district: Array<any>;
  ward: Array<any>;

  genderItemsSource = [
    {
      name: 'Nữ',
      value: General.Gender.GENDER_FEMALE
    },
    {
      name: 'Nam',
      value: General.Gender.GENDER_MALE
    }
  ];

  inputDate = {
    minDay: new Date(1960, 1, 1).getTime(),
    maxDay: new Date(2005, 1, 1).getTime()
  };

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fb: FormBuilder,
    private _fuseProgressBarService: FuseProgressBarService,
    private _router: Router,
    private _validatorService: ValidatorService,
    private _dialog: DialogService,
    private orgService: OrgManagementService
  ) {
    super();
  }

  ngOnInit(): void {
    this._fuseProgressBarService.show();
    this.form = this._fb.group({
      username: [null, Validators.compose(
        [this._validatorService.getInputRequired()]
      ), this._validatorService.getUsernameCheck()],
      email: [null, Validators.compose(
        [this._validatorService.getInputRequired(), this._validatorService.getEmailPattern()]
      ), this._validatorService.getEmailCheck()],
      password: ['', [this._validatorService.getInputRequired()]],
      phone: ['', [this._validatorService.getInputRequired()]],
      name: ['', [this._validatorService.getInputRequired()]],
      retypePassword: ['', [this._validatorService.getInputRequired(), confirmPasswordValidator]],
      gender: [1],
      district: ['', [this._validatorService.getInputRequired()]],
      ward: ['', [this._validatorService.getInputRequired()]],
      city: ['', [this._validatorService.getInputRequired()]],
      birth: ['', [this._validatorService.getInputRequired()]]
    });

    this._fuseProgressBarService.hide();

  }

  onRadioChange(event: any): void {
    console.log('radio group change', event);
  }

  onClickBtnAddNewChild(): void {
    this.markAsTouchedForAll(this.form);
    if (this.form.invalid) {
      return;
    }

    this._fuseProgressBarService.show();
    const childRequest = this.getFormValue();

    const sub = this.orgService.addChild(childRequest).subscribe(res => {
      if (res.status === HTTP_CODES.SUCCESS) {
        this.isSuccess = true;
        const subDialog = this._dialog.openInfo('Thêm tài khoản con thành công')
          .subscribe((_result: DialogResult) => {
            this._router.navigate(['/quan-ly-tai-khoan-doanh-nghiep/danh-sach']);
          });
        this.subscriptions.push(subDialog);
      } else {
        this.isSuccess = false;
        this._dialog.openWarning(res.message).subscribe().unsubscribe();
      }
      this._fuseProgressBarService.hide();
    }, err => {
      this.isSuccess = false;
      this._fuseProgressBarService.hide();
    });

    this.subscriptions.push(sub);
  }

  onChangeCity(code): void {
    this.ward = [];
    this.district = result.cityDistrictProject.find(city => city.code === code).district;
  }

  onChangeWard(id): void {
    this.ward = this.district.find(ward => ward.id === id).ward;
  }

  private getFormValue(): ChildRequest {
    return {
      username: this.form.value.username,
      email: this.form.value.email,
      name: this.form.value.name,
      phone: this.form.value.phone,
      birth: this.form.value.birth,
      city: this.form.value.city,
      district: this.form.value.district,
      gender: this.form.value.gender,
      password: this.form.value.password,
      confirmedPassword: this.form.value.retypePassword,
      type: General.Type.TYPE_PERSONAL,
      ward: this.form.value.ward
    };
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const retypePassword = control.parent.get('retypePassword');

  if (!password || !retypePassword) {
    return null;
  }

  if (retypePassword.value === '') {
    return null;
  }

  if (password.value === retypePassword.value) {
    return null;
  }

  return {'passwordsNotMatching': true};
};
