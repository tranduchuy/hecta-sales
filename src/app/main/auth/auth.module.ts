import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { AuthService } from '../../core/auth/auth.service';
import { TokenStorage } from '../../core/auth/token-storage.service';

const routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],

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
    LoginComponent
  ],

  providers: [AuthService, TokenStorage]
})

export class AuthModule {}
