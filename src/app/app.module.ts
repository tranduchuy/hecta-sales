import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { ConfirmDialogComponent } from './shared/components/dialog/confirm/confirm-dialog.component';
import { InfoDialogComponent } from './shared/components/dialog/info/info-dialog.component';
import { WarningDialogComponent } from './shared/components/dialog/warning/warning-dialog.component';
import { MessageService } from './shared/services/message/message.service';
import { ValidatorService } from './shared/services/validators/validator.service';
import { AuthModule } from './main/auth/auth.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

const appRoutes: Routes = [
  {
    path: 'component-list',
    loadChildren: './shared/components/component-list/component-list.module#ComponentListModule'
  },
  {
    path: 'auth',
    loadChildren: './main/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    redirectTo: 'component-list'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InfoDialogComponent,
    WarningDialogComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    InfoDialogComponent,
    WarningDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,
    AuthModule
  ],
  providers: [
    MessageService,
    ValidatorService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
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
}
