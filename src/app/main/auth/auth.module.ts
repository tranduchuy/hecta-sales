import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatListModule } from '@angular/material';
import { AuthService } from '../../core/auth/auth.service';
import { TokenStorage } from '../../core/auth/token-storage.service';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InputTextModule } from 'app/shared/components/input-text/input-text.module';
import { InputPasswordModule } from 'app/shared/components/input-password/input-password.module';
import { RadioGroupModule } from 'app/shared/components/radio-group/radio-group.module';
import { CheckboxGroupModule } from 'app/shared/components/checkbox-group/checkbox-group.module';
import { ComboBoxModule } from 'app/shared/components/combo-box/combo-box.module';
import { AutoCompleteModule } from 'app/shared/components/auto-complete/auto-complete.module';
import { DatePickerModule } from 'app/shared/components/date-picker/date-picker.module';
import { ValidatorService } from 'app/shared/services/validators/validator.service';
import { MessageService } from 'app/shared/services/message/message.service';
import { DialogService } from 'app/shared/components/dialog/dialog.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, RegisterComponent, ResetPasswordComponent],

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
    InputPasswordModule,
    RadioGroupModule,
    CheckboxGroupModule,
    ComboBoxModule,
    AutoCompleteModule,
    DatePickerModule,
    MatGridListModule,
  ],

  exports: [
    LoginComponent, ForgotPasswordComponent, RegisterComponent, ResetPasswordComponent
  ],

  providers: [AuthService, TokenStorage, ValidatorService, MessageService, DialogService]
})

export class AuthModule {}
