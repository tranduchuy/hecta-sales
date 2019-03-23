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
var progress_bar_service_1 = require("../../../../@fuse/components/progress-bar/progress-bar.service");
var auth_service_1 = require("app/core/auth/auth.service");
var router_1 = require("@angular/router");
var page_base_component_1 = require("app/shared/components/base/page-base.component");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var dialog_service_1 = require("app/shared/components/dialog/dialog.service");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var ForgotPasswordComponent = /** @class */ (function (_super) {
    __extends(ForgotPasswordComponent, _super);
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    function ForgotPasswordComponent(_fuseConfigService, _formBuilder, fuseProgressBarService, authService, router, validatorService, dialog) {
        var _this = 
        // Configure the layout
        _super.call(this) || this;
        _this._fuseConfigService = _fuseConfigService;
        _this._formBuilder = _formBuilder;
        _this.fuseProgressBarService = fuseProgressBarService;
        _this.authService = authService;
        _this.router = router;
        _this.validatorService = validatorService;
        _this.dialog = dialog;
        _this.isSuccess = true;
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
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [this.validatorService.getInputRequired(), this.validatorService.getEmailPattern()]]
        });
    };
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var _this = this;
        this.fuseProgressBarService.show();
        var email = this.forgotPasswordForm.controls.email.value;
        var sub = this.authService.forgotPassword(email).subscribe(function (res) {
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                _this.isSuccess = true;
                _this.router.navigate(['login']);
                _this.dialog.openInfo('Tài khoản của bạn đã được gửi yêu cầu lấy lại. Chờ trong giây lát')
                    .subscribe(function (result) {
                    console.log('send mail success', result);
                });
            }
            else {
                _this.isSuccess = false;
                _this.dialog.openInfo('Tài khoản của bạn cần lấy lại không tồn tại hoặc không đúng. Xin hãy nhập lại')
                    .subscribe(function (result) {
                    console.log('send mail fail', result);
                });
            }
            _this.fuseProgressBarService.hide();
        }, function (err) {
            console.error(err);
            _this.isSuccess = false;
            _this.fuseProgressBarService.hide();
        });
        this.subscriptions.push(sub);
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: animations_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            forms_1.FormBuilder,
            progress_bar_service_1.FuseProgressBarService,
            auth_service_1.AuthService,
            router_1.Router,
            validator_service_1.ValidatorService,
            dialog_service_1.DialogService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}(page_base_component_1.PageBaseComponent));
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map