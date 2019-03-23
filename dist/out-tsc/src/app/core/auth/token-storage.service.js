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
var rxjs_1 = require("rxjs");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var TokenStorage = /** @class */ (function () {
    function TokenStorage(cookieService) {
        this.cookieService = cookieService;
    }
    /**
     * Get access token
     * @returns {Observable<string>}
     */
    TokenStorage.prototype.getAccessToken = function () {
        var token = this.cookieService.get('accessToken');
        return rxjs_1.of(token);
    };
    /**
     * Get refresh token
     * @returns {Observable<string>}
     */
    TokenStorage.prototype.getRefreshToken = function () {
        var token = this.cookieService.get('refreshToken');
        return rxjs_1.of(token);
    };
    /**
     * Get user roles in JSON string
     * @returns {Observable<any>}
     */
    TokenStorage.prototype.getUserRoles = function () {
        var roles = this.cookieService.get('userRoles');
        try {
            return rxjs_1.of(JSON.parse(roles));
        }
        catch (e) { }
    };
    /**
     * Set access token
     * @returns {TokenStorage}
     */
    TokenStorage.prototype.setAccessToken = function (token) {
        this.cookieService.set('accessToken', token, 7);
        return this;
    };
    /**
     * Set refresh token
     * @returns {TokenStorage}
     */
    TokenStorage.prototype.setRefreshToken = function (token) {
        this.cookieService.set('refreshToken', token, 7);
        return this;
    };
    /**
     * Set user roles
     * @param roles
     * @returns {TokenStorage}
     */
    TokenStorage.prototype.setUserRoles = function (roles) {
        if (roles != null) {
            this.cookieService.set('userRoles', JSON.stringify(roles), 7);
        }
        return this;
    };
    /**
     * Remove tokens
     */
    TokenStorage.prototype.clear = function () {
        this.cookieService.delete('accessToken');
        this.cookieService.delete('refreshToken');
        this.cookieService.delete('userRoles');
    };
    TokenStorage = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_cookie_service_1.CookieService])
    ], TokenStorage);
    return TokenStorage;
}());
exports.TokenStorage = TokenStorage;
//# sourceMappingURL=token-storage.service.js.map