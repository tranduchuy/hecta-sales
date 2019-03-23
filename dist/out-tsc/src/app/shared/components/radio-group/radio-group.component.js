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
var base_componen_1 = require("../base/base.componen");
var RADIO_GROUP__VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return RadioGroupComponent; }),
    multi: true
};
var RadioGroupComponent = /** @class */ (function (_super) {
    __extends(RadioGroupComponent, _super);
    function RadioGroupComponent() {
        var _this = _super.call(this) || this;
        _this.selectedValue = '';
        _this.direction = 'row'; // row or column
        _this.itemsSource = [];
        _this.displayPath = '';
        _this.valuePath = '';
        _this.valueChange = new core_1.EventEmitter();
        _this.onModelChange = function (_) { };
        _this.onModelTouched = function () { };
        return _this;
    }
    Object.defineProperty(RadioGroupComponent.prototype, "value", {
        get: function () {
            return this.findItemByValue(this.selectedValue);
        },
        set: function (val) {
            var item = this.findItemByValue(val);
            if (item) {
                this.selectedValue = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    RadioGroupComponent.prototype.onSelectRadio = function (event) {
        this.onModelChange(this.selectedValue);
        this.onModelTouched();
        this.valueChange.emit(this.findItemByValue(this.selectedValue));
    };
    RadioGroupComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    RadioGroupComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioGroupComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    RadioGroupComponent.prototype.findItemByValue = function (value) {
        var _this = this;
        return this.itemsSource.find(function (i) { return i[_this.valuePath] === value; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RadioGroupComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], RadioGroupComponent.prototype, "itemsSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RadioGroupComponent.prototype, "displayPath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RadioGroupComponent.prototype, "valuePath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], RadioGroupComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RadioGroupComponent.prototype, "valueChange", void 0);
    RadioGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-radio-group',
            templateUrl: './radio-group.component.html',
            styleUrls: ['./radio-group.component.scss'],
            providers: [RADIO_GROUP__VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], RadioGroupComponent);
    return RadioGroupComponent;
}(base_componen_1.BaseComponent));
exports.RadioGroupComponent = RadioGroupComponent;
//# sourceMappingURL=radio-group.component.js.map