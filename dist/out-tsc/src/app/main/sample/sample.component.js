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
var translation_loader_service_1 = require("@fuse/services/translation-loader.service");
var en_1 = require("./i18n/en");
var tr_1 = require("./i18n/tr");
var http_1 = require("@angular/common/http");
var SampleComponent = /** @class */ (function () {
    function SampleComponent(_fuseTranslationLoaderService, http) {
        var _this = this;
        this._fuseTranslationLoaderService = _fuseTranslationLoaderService;
        this.http = http;
        /**
         * Constructor
         *
         * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
         */
        this.itemsSource = [];
        this._fuseTranslationLoaderService.loadTranslations(en_1.locale, tr_1.locale);
        this.http.get('http://159.89.202.248:3000/api/v1/posts/list?postType=1').subscribe(function (res) {
            _this.itemsSource = res.data.items;
        });
    }
    SampleComponent = __decorate([
        core_1.Component({
            selector: 'sample',
            templateUrl: './sample.component.html',
            styleUrls: ['./sample.component.scss']
        }),
        __metadata("design:paramtypes", [translation_loader_service_1.FuseTranslationLoaderService,
            http_1.HttpClient])
    ], SampleComponent);
    return SampleComponent;
}());
exports.SampleComponent = SampleComponent;
//# sourceMappingURL=sample.component.js.map