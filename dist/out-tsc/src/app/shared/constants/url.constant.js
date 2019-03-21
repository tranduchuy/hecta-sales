"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("environments/environment");
var URLs;
(function (URLs) {
    URLs.LOGIN = environment_1.environment.apiEndpoint + '/api/v1/users/login';
    URLs.FORGOT_PASSWORD = environment_1.environment.apiEndpoint + '/api/v1/users/forget-password';
    URLs.RESET_PASSWORD = environment_1.environment.apiEndpoint + '/api/v1/users/reset-password';
    URLs.RULE_ALERT_LEAD = '/api/v1/rule-alert-lead';
    URLs.REGISTER = environment_1.environment.apiEndpoint + '/api/v1/users/register';
    URLs.CHECK = environment_1.environment.apiEndpoint + '/api/v1/users/check';
    URLs.USER = '/api/v1/users/update';
})(URLs = exports.URLs || (exports.URLs = {}));
//# sourceMappingURL=url.constant.js.map