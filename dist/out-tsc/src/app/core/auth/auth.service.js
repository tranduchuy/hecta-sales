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
var http_1 = require("@angular/common/http");
var token_storage_service_1 = require("./token-storage.service");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var url_constant_1 = require("../../shared/constants/url.constant");
var http_code_constant_1 = require("../../shared/constants/http-code.constant");
var AuthService = /** @class */ (function () {
    function AuthService(http, tokenStorage, router) {
        this.http = http;
        this.tokenStorage = tokenStorage;
        this.router = router;
        this.onCredentialUpdated$ = new rxjs_1.Subject();
    }
    /**
     * Check, if user already authorized.
     * @description Should return Observable with true or false values
     * @returns {Observable<boolean>}
     * @memberOf AuthService
     */
    AuthService.prototype.isAuthorized = function () {
        return this.tokenStorage.getAccessToken().pipe(operators_1.map(function (token) { return !!token; }));
    };
    /**
     * Get access token
     * @description Should return access token in Observable from e.g. localStorage
     * @returns {Observable<string>}
     */
    AuthService.prototype.getAccessToken = function () {
        return this.tokenStorage.getAccessToken();
    };
    /**
     * Get user roles
     * @returns {Observable<any>}
     */
    AuthService.prototype.getUserRoles = function () {
        return this.tokenStorage.getUserRoles();
    };
    /**
     * Function, checks response of failed request to determine,
     * whether token be refreshed or not.
     * @description Essentialy checks status
     * @param {Response} response
     * @returns {boolean}
     */
    AuthService.prototype.refreshShouldHappen = function (response) {
        return response.status === http_code_constant_1.HTTP_CODES.ERROR_AUTHORIZED;
    };
    /**
     * Submit login request
     * @param {Credential} credential
     * @returns {Observable<any>}
     */
    AuthService.prototype.login = function (credential) {
        return this.http.post(url_constant_1.URLs.LOGIN, credential)
            .pipe(operators_1.map(function (res) { return Object.assign({}, {
            accessToken: res.data.token,
            refreshToken: res.data.refreshToken,
            roles: res.data.role
        }, {
            status: res.status
        }); }), operators_1.tap(this.saveAccessData.bind(this)), operators_1.catchError(this.handleError('login', [])));
    };
    AuthService.prototype.register = function (user) {
        return this.http
            .post(url_constant_1.URLs.REGISTER, user)
            .pipe(operators_1.catchError(this.handleError('register', [])));
    };
    AuthService.prototype.checkUser = function (username) {
        return this._checkEmailOrUsernameValidator({ username: username });
    };
    AuthService.prototype.checkEmail = function (email) {
        return this._checkEmailOrUsernameValidator({ email: email });
    };
    AuthService.prototype._checkEmailOrUsernameValidator = function (data) {
        var _this = this;
        return rxjs_1.timer(1000)
            .pipe(operators_1.switchMap(function () {
            return _this.http.post(url_constant_1.URLs.CHECK, data);
        }));
    };
    /**
     * Logout
     */
    AuthService.prototype.logout = function () {
        this.tokenStorage.clear();
        this.router.navigate(['auth/login']);
    };
    AuthService.prototype.forgotPassword = function (data) {
        return this.http.post(url_constant_1.URLs.FORGOT_PASSWORD, { email: data, type: 'APP' })
            .pipe(operators_1.map(function (res) { return Object.assign({}, {
            status: res.status,
            message: res.message
        }); }), operators_1.catchError(this.handleError('login', [])));
    };
    AuthService.prototype.resetPassword = function (password) {
        return this.http.post(url_constant_1.URLs.RESET_PASSWORD, password)
            .pipe(operators_1.map(function (res) { return Object.assign({}, {
            status: res.status,
            message: res.message
        }); }), operators_1.catchError(this.handleError('login', [])));
    };
    /**
     * Submit registration request
     * @param {Credential} credential
     * @returns {Observable<any>}
     */
    // public register(credential: Credential): Observable<any> {
    // dummy token creation
    // credential = Object.assign({}, credential, {
    //   accessToken: 'access-token-' + Math.random(),
    //   refreshToken: 'access-token-' + Math.random(),
    //   roles: ['USER']
    // });
    // return this.http
    //   .post(this.API_URL + this.API_ENDPOINT_REGISTER, credential)
    //   .pipe(
    //     catchError(this.handleError('register', []))
    //   );
    // }
    /**
     * Submit forgot password request
     * @param {Credential} credential
     * @returns {Observable<any>}
     */
    // public requestPassword(credential: Credential): Observable<any> {
    // return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
    //   .pipe(catchError(this.handleError('forgot-password', []))
    //   );
    // }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    AuthService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.from(result);
        };
    };
    /**
     * Save access data in the storage
     * @private
     * @param {AccessData} data
     */
    AuthService.prototype.saveAccessData = function (accessData) {
        if (typeof accessData !== 'undefined') {
            this.tokenStorage
                .setAccessToken(accessData.accessToken)
                .setRefreshToken(accessData.refreshToken)
                .setUserRoles(accessData.roles);
            this.onCredentialUpdated$.next(accessData);
        }
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            token_storage_service_1.TokenStorage,
            router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map