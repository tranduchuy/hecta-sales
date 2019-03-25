import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from '../shared/service/user.service';
import { General } from 'app/shared/constants/general.constant';
import { URLs } from 'app/shared/constants/url.constant';
import { HTTP_CODES } from 'app/shared/constants/http-code.constant';
import { UserProfile } from '../shared/model/user-profile';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserDetailComponent extends PageBaseComponent implements OnInit {
  @ViewChild('imageInput') imageInput: ElementRef;
  user: UserProfile;
  isSuccess: Boolean = true;

  url: any;
  userForm: FormGroup;

  selectedFile: File = null;

  genderItemsSource = [
    {
      name: 'Nam',
      value: General.Gender.GENDER_MALE
    },
    {
      name: 'Nữ',
      value: General.Gender.GENDER_FEMALE
    }
  ];

  constructor(
    private _fb: FormBuilder,
    private _dialog: DialogService,
    private _validatorService: ValidatorService,
    private _userService: UserService,
    private _fuseProgressBarService: FuseProgressBarService
  ) {
    super();
  }

  ngOnInit(): void {
    this._userService.getUser().subscribe(res => {
      this.user = res.data.user;
      console.log(this.user);
      this.url = `${URLs.IMAGE}/${this.user.avatar}`;
    });

    this.userForm = this._fb.group({
      name: ['', [this._validatorService.getInputRequired()]],
      gender: [''],
      phone: [''],
      email: [''],
      avatar: [''],
      url: ['']
    });
  }

  onUploadImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
        this.selectedFile = this.url;
      };

      this._userService.uploadImage(this.selectedFile).subscribe(res => {
        this._fuseProgressBarService.show();
        if (res.status === HTTP_CODES.SUCCESS) {
          this.userForm.controls['avatar'].setValue(res.data.link);
          const subDialog = this._dialog.openInfo('Tải ảnh thành công.')
            .subscribe((result: DialogResult) => {
              console.log('update password success', result);
            });
          this.subscriptions.push(subDialog);
        }

        if (res.status === HTTP_CODES.ERROR) {
          const subDialog = this._dialog.openInfo('Tải ảnh không thành công. Thử lại.')
            .subscribe();
          this.subscriptions.push(subDialog);
        }
        this._fuseProgressBarService.hide();
      });
    }
  }

  onBrowser(event: any): void {
    event.preventDefault();
    const e: HTMLElement = document.getElementById('imgupload') as HTMLElement;
    e.click();
  }

  onRemove(): void {
    this.url = '';
    this.imageInput.nativeElement.value = '';
  }

  onUpdateProfile(): void {

    const sub = this._userService.updateProfile(this.userForm.value).subscribe(
      res => {
        if (res.status === HTTP_CODES.SUCCESS) {
          const subDialog = this._dialog.openInfo('Cập nhật tài khoản thành công')
            .subscribe((result: DialogResult) => {
              console.log('update password success', result);
            });
          this.subscriptions.push(subDialog);
        } else {
          this.isSuccess = false;
          const subDialog = this._dialog.openInfo('Cập nhật tài khoản không thành công. Vui lòng kiểm tra lại thông tin.')
            .subscribe((result: DialogResult) => {
              console.log('update password fail', result);
            });
          this.subscriptions.push(subDialog);
        }
      }
    );

    this.subscriptions.push(sub);
  }
}
