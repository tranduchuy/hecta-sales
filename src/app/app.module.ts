import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule, MatSnackBar
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { UserService } from './main/user-management/shared/service/user.service';
import { ConfirmDialogComponent } from './shared/components/dialog/confirm/confirm-dialog.component';
import { InfoDialogComponent } from './shared/components/dialog/info/info-dialog.component';
import { WarningDialogComponent } from './shared/components/dialog/warning/warning-dialog.component';
import { MessageService } from './shared/services/message/message.service';
import { MessagingService } from './shared/services/messaging/messaging.service';
import { ValidatorService } from './shared/services/validators/validator.service';
import { AuthModule } from './main/auth/auth.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { RuleAlertLeadManagementModule } from './main/rule-alert-lead-management/rule-alert-lead-management.module';
import { UserManagementModule } from './main/user-management/user-management.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceLocator } from './shared/services/service-locator';
import { environment } from '../environments/environment';
import { TextDialogComponent } from './shared/components/dialog/text/text-dialog.component';
import {NumberDialogComponent} from './shared/components/dialog/number/number-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoDialogComponent,
    WarningDialogComponent,
    ConfirmDialogComponent,
    TextDialogComponent,
    NumberDialogComponent
  ],
  entryComponents: [
    InfoDialogComponent,
    WarningDialogComponent,
    ConfirmDialogComponent,
    TextDialogComponent,
    NumberDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AppRoutingModule,

    // Material moment date module
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    // App modules
    LayoutModule,
    SampleModule,
    AuthModule,
    RuleAlertLeadManagementModule,
    UserManagementModule
  ],
  providers: [
    MessagingService,
    MessageService,
    ValidatorService,
    UserService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: 'API_GOOGLE_CAPTCHA_TOKEN', useValue: environment.googleCaptchaToken},
    {provide: 'API_GOOGLE_MAP_TOKEN', useValue: environment.googleMapToken},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
