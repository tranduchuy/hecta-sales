import { Component, OnInit } from '@angular/core';
import { General } from 'app/shared/constants/general.constant';
import { HectaInfo } from '../shared/model/hecta-info.model';
import { UserService } from 'app/main/user-management/shared/service/user.service';
import { UserProfile } from 'app/main/user-management/shared/model/user-profile';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';
import { DialogService, DialogResult } from 'app/shared/components/dialog/dialog.service';
import {FuseProgressBarService} from "../../../../@fuse/components/progress-bar/progress-bar.service";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})


export class RechargeComponent extends PageBaseComponent implements OnInit {

  user: UserProfile;

  srcACB: string = General.BankLogo.ACB;
  srcDongA: string = General.BankLogo.DONG_A;

  hecta: HectaInfo = {
    name: 'Văn Đức Sơn Hà',
    account_number_acb: '47718749',
    account_number_donga: '0101097130'
  };

  constructor(private _userService: UserService, private _dialog: DialogService, private _fuseProgressBarService: FuseProgressBarService) {
    super();
  }

  ngOnInit() {
    this._fuseProgressBarService.show();
    const sub = this._userService.getUser().subscribe(
      (res: any) => {
        this.user = res.data.user;
      }
    )
    this.subscriptions.push(sub);
    this._fuseProgressBarService.hide();
  }

  copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    const subDialog = this._dialog.openInfo('Đã sao chép số tài khoản vào khay nhớ tạm.')
      .subscribe();
    this.subscriptions.push(subDialog);
  }

}
