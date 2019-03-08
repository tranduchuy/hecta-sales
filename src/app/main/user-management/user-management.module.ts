import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxModule } from '../../shared/components/combo-box/combo-box.module';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatLineModule, MatListModule, MatSelectModule, MatCardModule } from '@angular/material';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagementRoutingModule } from './user-management.routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { InputTextModule } from 'app/shared/components/input-text/input-text.module';
import { InputPasswordModule } from 'app/shared/components/input-password/input-password.module';
import { DatePickerModule } from 'app/shared/components/date-picker/date-picker.module';
import { RadioGroupModule } from 'app/shared/components/radio-group/radio-group.module';
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserDetailComponent, UserUpdatePasswordComponent, UserListComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    UserManagementRoutingModule,
    ComboBoxModule,
    InputTextModule,
    InputPasswordModule,
    DatePickerModule,
    RadioGroupModule,
    MatButtonModule,
    MatListModule,
    MatLineModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    FuseSharedModule
  ]
})
export class UserManagementModule {}
