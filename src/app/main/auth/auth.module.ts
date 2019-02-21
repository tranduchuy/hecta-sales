import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDialogModule } from '@angular/material';
import { AuthService } from '../../core/auth/auth.service';
import { TokenStorage } from '../../core/auth/token-storage.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InputTextModule } from 'app/shared/components/input-text/input-text.module';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { MessageService } from 'app/shared/services/message/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'app/shared/components/dialog/dialog.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],

  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],

  exports: [
    LoginComponent, ForgotPasswordComponent
  ],

  providers: [AuthService, TokenStorage, ValidatorService, MessageService, DialogService]
})

export class AuthModule {}
