import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxModule } from '../../shared/components/combo-box/combo-box.module';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatLineModule, MatListModule, MatSelectModule } from '@angular/material';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagementRoutingModule } from './user-management.routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { InputTextModule } from 'app/shared/components/input-text/input-text.module';
import { InputPasswordModule } from 'app/shared/components/input-password/input-password.module';


@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    UserManagementRoutingModule,
    ComboBoxModule,
    InputTextModule,
    InputPasswordModule,
    MatButtonModule,
    MatListModule,
    MatLineModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FuseSharedModule
  ]
})
export class UserManagementModule {}
