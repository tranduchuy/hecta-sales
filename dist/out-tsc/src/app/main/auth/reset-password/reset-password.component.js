"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var config_service_1 = require("@fuse/services/config.service");
var animations_1 = require("@fuse/animations");
var page_base_component_1 = require("app/shared/components/base/page-base.component");
var progress_bar_service_1 = require("@fuse/components/progress-bar/progress-bar.service");
var auth_service_1 = require("app/core/auth/auth.service");
var router_1 = require("@angular/router");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var dialog_service_1 = require("app/shared/components/dialog/dialog.service");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var ResetPasswordComponent = /** @class */ (function (_super) {
    __extends(ResetPasswordComponent, _super);
    function ResetPasswordComponent(_fuseConfigService, _formBuilder, fuseProgressBarService, authService, router, validatorService, dialog, activatedRoute) {
        var _this = _super.call(this) || this;
        _this._fuseConfigService = _fuseConfigService;
        _this._formBuilder = _formBuilder;
        _this.fuseProgressBarService = fuseProgressBarService;
        _this.authService = authService;
        _this.router = router;
        _this.validatorService = validatorService;
        _this.dialog = dialog;
        _this.activatedRoute = activatedRoute;
        _this.isSuccess = true;
        // Configure the layout
        _this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        return _this;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetPasswordForm = this._formBuilder.group({
            password: ['', [this.validatorService.getInputRequired()]],
            confirmedPassword: ['', [this.validatorService.getInputRequired(), exports.confirmPasswordValidator]]
        });
        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        var sub = this.resetPasswordForm.get('password').valueChanges
            .subscribe(function () {
            _this.resetPasswordForm.get('confirmedPassword').updateValueAndValidity();
        });
        this.subscriptions.push(sub);
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.fuseProgressBarService.show();
        var password = {
            resetToken: this.activatedRoute.snapshot.paramMap.get('token'),
            password: this.resetPasswordForm.controls.password.value,
            confirmedPassword: this.resetPasswordForm.controls.confirmedPassword.value,
            type: 'APP'
        };
        var subHttp = this.authService.resetPassword(password).subscribe(function (res) {
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                _this.isSuccess = true;
                _this.router.navigate(['login']);
                var subDialog = _this.dialog.openInfo('Tài khoản của bạn đã được thay đổi thành công. Chuyển đến trang đăng nhập trong giây lát')
                    .subscribe(function (result) {
                    console.log('send mail success', result);
                });
                _this.subscriptions.push(subDialog);
            }
            else {
                _this.isSuccess = false;
                var subDialog = _this.dialog.openInfo('Mật khẩu của bạn không đúng. Xin nhập lại')
                    .subscribe(function (result) {
                    console.log('send mail fail', result);
                });
                _this.subscriptions.push(subDialog);
            }
            _this.subscriptions.push(subHttp);
            _this.fuseProgressBarService.hide();
        }, function (err) {
            console.error(err);
            _this.isSuccess = false;
            _this.fuseProgressBarService.hide();
        });
        this.subscriptions.push(subHttp);
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: animations_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            forms_1.FormBuilder,
            progress_bar_service_1.FuseProgressBarService,
            auth_service_1.AuthService,
            router_1.Router,
            validator_service_1.ValidatorService,
            dialog_service_1.DialogService,
            router_1.ActivatedRoute])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}(page_base_component_1.PageBaseComponent));
exports.ResetPasswordComponent = ResetPasswordComponent;
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
exports.confirmPasswordValidator = function (control) {
    if (!control.parent || !control) {
        return null;
    }
    var password = control.parent.get('password');
    var confirmedPassword = control.parent.get('confirmedPassword');
    if (!password || !confirmedPassword) {
        return null;
    }
    if (confirmedPassword.value === '') {
        return null;
    }
    if (password.value === confirmedPassword.value) {
        return null;
    }
    return { 'passwordsNotMatching': true };
};
//# sourceMappingURL=reset-password.component.js.map