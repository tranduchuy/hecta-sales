import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from '../shared/service/user.service';
import { General } from 'app/shared/constants/general.constant';
import { URLs } from 'app/shared/constants/url.constant';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserDetailComponent extends PageBaseComponent implements OnInit {

  user;
  isSuccess: Boolean = true;

  url;
  userForm: FormGroup;

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
  ) {
    super();
  }

  ngOnInit(): void {
    this._userService.getUser().subscribe(res => {
      this.user = res.data.user;
      console.log(this.user);
      this.url = `${URLs.IMAGE}/${this.user.avatar}`;
    })

    this.userForm = this._fb.group({
      name: ['', [this._validatorService.getInputRequired()]],
      birth: ['', this._validatorService.getInputRequired()],
      gender: [''],
      phone: [''],
      email: [''],
      avatar: ['']
    })

  }

  onRadioChange(event: any): void {
    console.log('radio group change', event);
  }

  onUploadImage(event): void {
    if (event.target.files && event.target.files[0]) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  onBrowser(event: any) {
    event.preventDefault();
    let e: HTMLElement = document.getElementById('imgupload') as HTMLElement;
    e.click();
  }

  onRemove(): void {
    this.url = '';
  }

  onUpdateProfile(): void {
    this._userService.uploadImage(this.userForm.controls.avatar.value);

    const sub = this._userService.updateProfile(this.userForm.value).subscribe(
      res => {
        if (res.status == 1) {
          const subDialog = this._dialog.openInfo('Cập nhật tài khoản thành công')
            .subscribe((result: DialogResult) => {
              console.log('update password success', result);
            });
          this.subscriptions.push(subDialog);
        } else {
          this.isSuccess = false;
          const subDialog = this._dialog.openInfo('Vui lòng nhập chính xác mật khẩu của bạn')
            .subscribe((result: DialogResult) => {
              console.log('update password fail', result);
            });
          this.subscriptions.push(subDialog);
        }
      }
    )
    this.subscriptions.push(sub);
  }
}
