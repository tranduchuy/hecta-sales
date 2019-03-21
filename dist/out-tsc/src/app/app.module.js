"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var material_1 = require("@angular/material");
var core_2 = require("@ngx-translate/core");
require("hammerjs");
var fuse_module_1 = require("@fuse/fuse.module");
var shared_module_1 = require("@fuse/shared.module");
var components_1 = require("@fuse/components");
var fuse_config_1 = require("app/fuse-config");
var app_component_1 = require("app/app.component");
var layout_module_1 = require("app/layout/layout.module");
var sample_module_1 = require("app/main/sample/sample.module");
var confirm_dialog_component_1 = require("./shared/components/dialog/confirm/confirm-dialog.component");
var info_dialog_component_1 = require("./shared/components/dialog/info/info-dialog.component");
var warning_dialog_component_1 = require("./shared/components/dialog/warning/warning-dialog.component");
var message_service_1 = require("./shared/services/message/message.service");
var validator_service_1 = require("./shared/services/validators/validator.service");
var auth_module_1 = require("./main/auth/auth.module");
var token_interceptor_1 = require("./core/interceptors/token.interceptor");
var rule_alert_lead_management_module_1 = require("./main/rule-alert-lead-management/rule-alert-lead-management.module");
var user_management_module_1 = require("./main/user-management/user-management.module");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                info_dialog_component_1.InfoDialogComponent,
                warning_dialog_component_1.WarningDialogComponent,
                confirm_dialog_component_1.ConfirmDialogComponent,
            ],
            entryComponents: [
                info_dialog_component_1.InfoDialogComponent,
                warning_dialog_component_1.WarningDialogComponent,
                confirm_dialog_component_1.ConfirmDialogComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                core_2.TranslateModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                // Material moment date module
                material_moment_adapter_1.MatMomentDateModule,
                // Material
                material_1.MatButtonModule,
                material_1.MatIconModule,
                // Fuse modules
                fuse_module_1.FuseModule.forRoot(fuse_config_1.fuseConfig),
                components_1.FuseProgressBarModule,
                shared_module_1.FuseSharedModule,
                components_1.FuseSidebarModule,
                components_1.FuseThemeOptionsModule,
                // App modules
                layout_module_1.LayoutModule,
                sample_module_1.SampleModule,
                auth_module_1.AuthModule,
                rule_alert_lead_management_module_1.RuleAlertLeadManagementModule,
                user_management_module_1.UserManagementModule
            ],
            providers: [
                message_service_1.MessageService,
                validator_service_1.ValidatorService,
                { provide: material_1.MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true
                }
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map