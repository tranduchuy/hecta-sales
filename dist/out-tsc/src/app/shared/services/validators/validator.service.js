"use strict";
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
var message_service_1 = require("../message/message.service");
var validator_core_service_1 = require("./validator-core.service");
var auth_service_1 = require("app/core/auth/auth.service");
var operators_1 = require("rxjs/operators");
var ValidatorService = /** @class */ (function () {
    function ValidatorService(messageService, authService) {
        this.messageService = messageService;
        this.authService = authService;
        this.core = new validator_core_service_1.ValidatorCore();
        this.confirmPasswordValidator = function (control) {
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
    }
    ValidatorService.prototype.getInputRequired = function () {
        var _this = this;
        return function (ctl) {
            var ERR_REQUIRED = 'ERRORS.100';
            return _this.core.requiredValidator({
                validRequired: { errCode: ERR_REQUIRED }
            }, ctl.value, _this.messageService);
        };
    };
    ValidatorService.prototype.getUsernameCheck = function () {
        var _this = this;
        return function (ctl) {
            return _this.authService.checkUser(ctl.value)
                .pipe(operators_1.map(function (res) {
                if (!res.data) {
                    return { 'exists': true };
                }
            }));
        };
    };
    ValidatorService.prototype.getEmailCheck = function () {
        var _this = this;
        return function (ctl) {
            return _this.authService.checkEmail(ctl.value)
                .pipe(operators_1.map(function (res) {
                if (!res.data) {
                    return { 'exists': true };
                }
            }));
        };
    };
    ValidatorService.prototype.getEmailPattern = function () {
        var _this = this;
        var EMAIL_PATTERN = '(?=^([A-Za-z0-9!-\\/:-@\\[-`{-~]+)$)(?=^([^ @]+)@(([^ @.]+\\.)+[^ @.]{2,})$)';
        return function (ctl) {
            var ERR_EMAIL_PATTERN = 'ERRORS.101';
            return _this.core.requiredValidator({
                validReguEx: { pattern: EMAIL_PATTERN, errCode: ERR_EMAIL_PATTERN }
            }, ctl.value, _this.messageService);
        };
    };
    ValidatorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [message_service_1.MessageService,
            auth_service_1.AuthService])
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map