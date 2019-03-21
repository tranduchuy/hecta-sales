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
var operators_1 = require("rxjs/internal/operators");
var config_service_1 = require("@fuse/services/config.service");
var animations_1 = require("@fuse/animations");
var router_1 = require("@angular/router");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var dialog_service_1 = require("app/shared/components/dialog/dialog.service");
var page_base_component_1 = require("app/shared/components/base/page-base.component");
var progress_bar_service_1 = require("@fuse/components/progress-bar/progress-bar.service");
var auth_service_1 = require("app/core/auth/auth.service");
var general_constant_1 = require("app/shared/constants/general.constant");
var selector_constant_1 = require("app/shared/constants/selector.constant");
var register_constant_1 = require("app/shared/constants/register.constant");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var RegisterComponent = /** @class */ (function (_super) {
    __extends(RegisterComponent, _super);
    function RegisterComponent(_fuseConfigService, _fb, _fuseProgressBarService, _router, _validatorService, _dialog, _authService) {
        var _this = _super.call(this) || this;
        _this._fuseConfigService = _fuseConfigService;
        _this._fb = _fb;
        _this._fuseProgressBarService = _fuseProgressBarService;
        _this._router = _router;
        _this._validatorService = _validatorService;
        _this._dialog = _dialog;
        _this._authService = _authService;
        _this.isCaptchaCheck = false;
        _this.isSuccess = true;
        _this.cityItemsSource = selector_constant_1.default.cityDistrictProject;
        _this.siteKeyCaptcha = register_constant_1.RegisterConstants.siteKeyCaptcha;
        _this.genderItemsSource = [
            {
                name: 'Nữ',
                value: general_constant_1.General.Gender.GENDER_FEMALE
            },
            {
                name: 'Nam',
                value: general_constant_1.General.Gender.GENDER_MALE
            }
        ];
        _this.typeItemsSource = [
            {
                name: 'Cá nhân',
                value: general_constant_1.General.Type.TYPE_PERSONAL
            },
            {
                name: 'Doanh nghiệp',
                value: general_constant_1.General.Type.TYPE_BUSINESS
            }
        ];
        _this.inputDate = {
            minDay: new Date(1960, 1, 1).getTime(),
            maxDay: new Date(2005, 1, 1).getTime()
        };
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
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this._fb.group({
            username: [null, forms_1.Validators.compose([this._validatorService.getInputRequired()]), this._validatorService.getUsernameCheck()],
            email: [null, forms_1.Validators.compose([this._validatorService.getInputRequired(), this._validatorService.getEmailPattern()]), this._validatorService.getEmailCheck()],
            password: ['', [this._validatorService.getInputRequired()]],
            phone: ['', [this._validatorService.getInputRequired()]],
            name: ['', [this._validatorService.getInputRequired()]],
            retypePassword: ['', [this._validatorService.getInputRequired(), exports.confirmPasswordValidator]],
            gender: [1],
            district: ['', [this._validatorService.getInputRequired()]],
            ward: ['', [this._validatorService.getInputRequired()]],
            city: ['', [this._validatorService.getInputRequired()]],
            birth: ['', [this._validatorService.getInputRequired()]],
            type: [1]
        });
        grecaptcha.render('capcha_element', {
            'sitekey': this.siteKeyCaptcha
        });
        window['getResponceCapcha'] = this.getResponceCapcha.bind(this);
        var sub = this.registerForm.valueChanges
            .pipe(operators_1.distinctUntilChanged())
            .subscribe(function (value) {
            console.log('form value', value);
        });
        this.subscriptions.push(sub);
    };
    RegisterComponent.prototype.onRadioChange = function (event) {
        console.log('radio group change', event);
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this._fuseProgressBarService.show();
        var sub = this._authService.register(this.registerForm.value).subscribe(function (res) {
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                _this.isSuccess = true;
                var subDialog = _this._dialog.openInfo('Tài khoản của bạn đã đăng ký thành công. Vui lòng xác nhận email')
                    .subscribe(function (_result) {
                    console.log('send mail success', _result);
                });
                _this._router.navigate(['login']);
                _this.subscriptions.push(subDialog);
            }
            else {
                _this.isSuccess = false;
                var subDialog = _this._dialog.openInfo('Tài khoản của bạn không được đăng ký. Vui lòng kiểm tra lại các thông tin chưa đúng')
                    .subscribe(function (_result) {
                    console.log('send mail success', _result);
                });
                _this.subscriptions.push(subDialog);
            }
            _this._fuseProgressBarService.hide();
        }, function (err) {
            console.error(err);
            _this.isSuccess = false;
            _this._fuseProgressBarService.hide();
        });
        this.subscriptions.push(sub);
    };
    RegisterComponent.prototype.onChangeCity = function (code) {
        this.ward = [];
        this.district = selector_constant_1.default.cityDistrictProject.find(function (city) { return city.code == code; }).district;
    };
    RegisterComponent.prototype.onChangeWard = function (id) {
        this.ward = this.district.find(function (ward) { return ward.id == id; }).ward;
    };
    RegisterComponent.prototype.getResponceCapcha = function (captchaResponse) {
        this.verifyCaptcha(captchaResponse);
    };
    RegisterComponent.prototype.verifyCaptcha = function (captchaResponse) {
        this.isCaptchaCheck = true;
        this._dialog.openInfo(captchaResponse)
            .subscribe(function (_result) {
            console.log('send mail success', selector_constant_1.default);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: animations_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            forms_1.FormBuilder,
            progress_bar_service_1.FuseProgressBarService,
            router_1.Router,
            validator_service_1.ValidatorService,
            dialog_service_1.DialogService,
            auth_service_1.AuthService])
    ], RegisterComponent);
    return RegisterComponent;
}(page_base_component_1.PageBaseComponent));
exports.RegisterComponent = RegisterComponent;
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
    var retypePassword = control.parent.get('retypePassword');
    if (!password || !retypePassword) {
        return null;
    }
    if (retypePassword.value === '') {
        return null;
    }
    if (password.value === retypePassword.value) {
        return null;
    }
    return { 'passwordsNotMatching': true };
};
//# sourceMappingURL=register.component.js.map