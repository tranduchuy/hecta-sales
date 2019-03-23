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
var page_base_component_1 = require("app/shared/components/base/page-base.component");
var progress_bar_service_1 = require("@fuse/components/progress-bar/progress-bar.service");
var forms_1 = require("@angular/forms");
var dialog_service_1 = require("app/shared/components/dialog/dialog.service");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var user_service_1 = require("../shared/service/user.service");
var router_1 = require("@angular/router");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var UserUpdatePasswordComponent = /** @class */ (function (_super) {
    __extends(UserUpdatePasswordComponent, _super);
    function UserUpdatePasswordComponent(fuseProgressBarService, fb, dialog, validatorService, userService, router) {
        var _this = _super.call(this) || this;
        _this.fuseProgressBarService = fuseProgressBarService;
        _this.fb = fb;
        _this.dialog = dialog;
        _this.validatorService = validatorService;
        _this.userService = userService;
        _this.router = router;
        _this.isSuccess = true;
        return _this;
    }
    UserUpdatePasswordComponent.prototype.ngOnInit = function () {
        this.passwordForm = this.fb.group({
            oldPassword: ['', [this.validatorService.getInputRequired()]],
            password: ['', this.validatorService.getInputRequired()],
            confirmedPassword: ['', this.validatorService.getInputRequired()]
        });
    };
    UserUpdatePasswordComponent.prototype.updatePassword = function () {
        var _this = this;
        this.fuseProgressBarService.show();
        var subHttp = this.userService.updatePassword(this.passwordForm.value).subscribe(function (res) {
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                _this.isSuccess = true;
                var subDialog = _this.dialog.openInfo('Cập nhật tài khoản thành công')
                    .subscribe(function (result) {
                    console.log('update password success', result);
                });
                _this.router.navigate(['user/me']);
                _this.subscriptions.push(subDialog);
            }
            else {
                _this.isSuccess = false;
                var subDialog = _this.dialog.openInfo('Vui lòng nhập chính xác mật khẩu của bạn')
                    .subscribe(function (result) {
                    console.log('update password fail', result);
                });
                _this.subscriptions.push(subDialog);
            }
            _this.fuseProgressBarService.hide();
        }, function (err) {
            console.error(err);
            _this.isSuccess = false;
            _this.fuseProgressBarService.hide();
        });
        this.subscriptions.push(subHttp);
    };
    UserUpdatePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-user-update-password',
            templateUrl: './user-update-password.component.html',
            styleUrls: ['./user-update-password.component.scss']
        }),
        __metadata("design:paramtypes", [progress_bar_service_1.FuseProgressBarService,
            forms_1.FormBuilder,
            dialog_service_1.DialogService,
            validator_service_1.ValidatorService,
            user_service_1.UserService,
            router_1.Router])
    ], UserUpdatePasswordComponent);
    return UserUpdatePasswordComponent;
}(page_base_component_1.PageBaseComponent));
exports.UserUpdatePasswordComponent = UserUpdatePasswordComponent;
//# sourceMappingURL=user-update-password.component.js.map