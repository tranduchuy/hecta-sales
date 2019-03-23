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
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        this.id = '';
        this.isDisabled = false;
        this.isReadonly = false;
        this.placeholder = '';
        this.title = '';
        this.errors = [];
        this.gotFocus = new core_1.EventEmitter();
        this.lostFocus = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    BaseComponent.prototype.onLostFocus = function () {
        this.lostFocus.emit({ target: this });
    };
    BaseComponent.prototype.onFocus = function (event) {
        this.gotFocus.emit(event);
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAllSubscriptions();
    };
    BaseComponent.prototype.unsubscribeAllSubscriptions = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.data-id'),
        __metadata("design:type", Object)
    ], BaseComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BaseComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BaseComponent.prototype, "isReadonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BaseComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BaseComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], BaseComponent.prototype, "errors", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BaseComponent.prototype, "gotFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BaseComponent.prototype, "lostFocus", void 0);
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.componen.js.map