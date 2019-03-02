import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UserService } from '../shared/service/user.service';
import { General } from 'app/shared/constants/general.constant';

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
    private fuseProgressBarService: FuseProgressBarService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private validatorService: ValidatorService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', this.validatorService.getInputRequired()],
      birth: ['', this.validatorService.getInputRequired()],
      gender: [1],
      phone: ['0123456789'],
      email: ['huyphong@gmail.com'],
    })
  }

  onRadioChange(event: any): void {
    console.log('radio group change', event);
  }
}
