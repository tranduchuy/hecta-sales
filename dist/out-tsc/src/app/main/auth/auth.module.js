"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_component_1 = require("./login/login.component");
var core_2 = require("@ngx-translate/core");
var shared_module_1 = require("../../../@fuse/shared.module");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var auth_service_1 = require("../../core/auth/auth.service");
var token_storage_service_1 = require("../../core/auth/token-storage.service");
var register_component_1 = require("./register/register.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var input_text_module_1 = require("app/shared/components/input-text/input-text.module");
var input_password_module_1 = require("app/shared/components/input-password/input-password.module");
var radio_group_module_1 = require("app/shared/components/radio-group/radio-group.module");
var checkbox_group_module_1 = require("app/shared/components/checkbox-group/checkbox-group.module");
var combo_box_module_1 = require("app/shared/components/combo-box/combo-box.module");
var auto_complete_module_1 = require("app/shared/components/auto-complete/auto-complete.module");
var date_picker_module_1 = require("app/shared/components/date-picker/date-picker.module");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var message_service_1 = require("app/shared/services/message/message.service");
var dialog_service_1 = require("app/shared/components/dialog/dialog.service");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'forgot-password',
        component: forgot_password_component_1.ForgotPasswordComponent
    },
    {
        path: 'reset-password/:token',
        component: reset_password_component_1.ResetPasswordComponent
    }
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [login_component_1.LoginComponent, forgot_password_component_1.ForgotPasswordComponent, register_component_1.RegisterComponent, reset_password_component_1.ResetPasswordComponent],
            imports: [
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                core_2.TranslateModule,
                shared_module_1.FuseSharedModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatFormFieldModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                input_text_module_1.InputTextModule,
                input_password_module_1.InputPasswordModule,
                radio_group_module_1.RadioGroupModule,
                checkbox_group_module_1.CheckboxGroupModule,
                combo_box_module_1.ComboBoxModule,
                auto_complete_module_1.AutoCompleteModule,
                date_picker_module_1.DatePickerModule,
                material_1.MatGridListModule,
            ],
            exports: [
                login_component_1.LoginComponent, forgot_password_component_1.ForgotPasswordComponent, register_component_1.RegisterComponent, reset_password_component_1.ResetPasswordComponent
            ],
            providers: [auth_service_1.AuthService, token_storage_service_1.TokenStorage, validator_service_1.ValidatorService, message_service_1.MessageService, dialog_service_1.DialogService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map