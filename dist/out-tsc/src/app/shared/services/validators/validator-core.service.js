"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidatorCore = /** @class */ (function () {
    function ValidatorCore() {
    }
    ValidatorCore.prototype.isRequireValid = function (value) {
        return !this.nullOrEmpty(value);
    };
    ValidatorCore.prototype.requiredValidator = function (funcSetting, value, messageService) {
        var response = {};
        if (funcSetting.validRequired && !this.isRequireValid(value)) {
            response[funcSetting.validRequired.errCode] = messageService.get(funcSetting.validRequired.errCode).content;
        }
        if (funcSetting.validReguEx
            && !this.isRegExpValid(value, funcSetting.validReguEx.pattern)) {
            response[funcSetting.validReguEx.errCode] = messageService.get(funcSetting.validReguEx.errCode).content;
        }
        return response;
    };
    ValidatorCore.prototype.nullOrEmpty = function (value) {
        // Undefined
        if (value === undefined) {
            return true;
        }
        // Null
        if (value === null) {
            return true;
        }
        // Empty string
        if (typeof value === 'string') {
            return value === '';
        }
        // Empty array
        if (value instanceof Array) {
            return value.length === 0;
        }
        return false;
    };
    ValidatorCore.prototype.isRegExpValid = function (value, pattern) {
        return (new RegExp(pattern).test(value));
    };
    ValidatorCore = __decorate([
        core_1.Injectable()
    ], ValidatorCore);
    return ValidatorCore;
}());
exports.ValidatorCore = ValidatorCore;
//# sourceMappingURL=validator-core.service.js.map