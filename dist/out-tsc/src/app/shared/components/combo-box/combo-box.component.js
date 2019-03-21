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
var COMBO_BOX_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ComboBoxComponent; }),
    multi: true
};
var ComboBoxComponent = /** @class */ (function (_super) {
    __extends(ComboBoxComponent, _super);
    function ComboBoxComponent() {
        var _this = _super.call(this) || this;
        _this.selectedValue = '';
        _this.itemsSource = [];
        _this.displayPath = '';
        _this.valuePath = '';
        _this.icon = '';
        _this.valueChange = new core_1.EventEmitter();
        _this.onModelChange = function (_) { };
        _this.onModelTouched = function () { };
        return _this;
    }
    Object.defineProperty(ComboBoxComponent.prototype, "value", {
        get: function () {
            return this.selectedValue;
        },
        set: function (val) {
            this.selectedValue = val;
        },
        enumerable: true,
        configurable: true
    });
    ComboBoxComponent.prototype.onSelectOption = function (event) {
        console.log('event', event);
        this.onModelTouched();
        this.onModelChange(this.selectedValue);
        this.valueChange.emit(this.selectedValue);
    };
    ComboBoxComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    ComboBoxComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ComboBoxComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ComboBoxComponent.prototype, "itemsSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComboBoxComponent.prototype, "displayPath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComboBoxComponent.prototype, "valuePath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComboBoxComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ComboBoxComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ComboBoxComponent.prototype, "valueChange", void 0);
    ComboBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-combo-box',
            templateUrl: './combo-box.component.html',
            styleUrls: ['./combo-box.component.scss'],
            providers: [COMBO_BOX_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], ComboBoxComponent);
    return ComboBoxComponent;
}(base_componen_1.BaseComponent));
exports.ComboBoxComponent = ComboBoxComponent;
//# sourceMappingURL=combo-box.component.js.map