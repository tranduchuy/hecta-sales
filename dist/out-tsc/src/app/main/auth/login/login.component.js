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
var auth_service_1 = require("../../../core/auth/auth.service");
var router_1 = require("@angular/router");
var progress_bar_service_1 = require("../../../../@fuse/components/progress-bar/progress-bar.service");
var page_base_component_1 = require("app/shared/components/base/page-base.component");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    function LoginComponent(_fuseConfigService, fuseProgressBarService, _formBuilder, authServie, validatorService, router) {
        var _this = _super.call(this) || this;
        _this._fuseConfigService = _fuseConfigService;
        _this.fuseProgressBarService = fuseProgressBarService;
        _this._formBuilder = _formBuilder;
        _this.authServie = authServie;
        _this.validatorService = validatorService;
        _this.router = router;
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
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this._formBuilder.group({
            username: ['', this.validatorService.getInputRequired()],
            password: ['', this.validatorService.getInputRequired()]
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.fuseProgressBarService.show();
        console.log(this.loginForm.value);
        var credential = {
            username: this.loginForm.controls.username.value,
            password: this.loginForm.controls.password.value
        };
        var sub = this.authServie.login(credential).subscribe(function (res) {
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                _this.isSuccess = true;
                _this.router.navigate(['sample']);
            }
            else {
                _this.isSuccess = false;
            }
            _this.fuseProgressBarService.hide();
        }, function (err) {
            console.error(err);
            _this.isSuccess = false;
            _this.fuseProgressBarService.hide();
        });
        this.subscriptions.push(sub);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: animations_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            progress_bar_service_1.FuseProgressBarService,
            forms_1.FormBuilder,
            auth_service_1.AuthService,
            validator_service_1.ValidatorService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}(page_base_component_1.PageBaseComponent));
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map