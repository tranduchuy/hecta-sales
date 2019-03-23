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
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var http_code_constant_1 = require("../../shared/constants/http-code.constant");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(router, cookieService) {
        this.router = router;
        this.cookieService = cookieService;
    }
    // intercept request and add token
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        // modify request
        request = request.clone({
            setHeaders: {
                accesstoken: "" + this.cookieService.get('accessToken')
            }
        });
        return next.handle(request).pipe(operators_1.tap(function (event) {
            if (event instanceof http_1.HttpResponse) {
                if (event.body.status === http_code_constant_1.HTTP_CODES.ERROR_AUTHORIZED) {
                    _this.router.navigate(['auth/login']);
                }
            }
        }, function (error) {
            // http response status code
            if (error.status === http_code_constant_1.HTTP_CODES.ERROR_AUTHORIZED) {
                _this.router.navigate(['auth/login']);
            }
        }));
    };
    TokenInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, ngx_cookie_service_1.CookieService])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=token.interceptor.js.map