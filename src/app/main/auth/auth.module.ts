import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { AuthService } from '../../core/auth/auth.service';
import { TokenStorage } from '../../core/auth/token-storage.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

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
    MatInputModule
  ],

  exports: [
    LoginComponent, ForgotPasswordComponent
  ],

  providers: [AuthService, TokenStorage]
})

export class AuthModule {}
