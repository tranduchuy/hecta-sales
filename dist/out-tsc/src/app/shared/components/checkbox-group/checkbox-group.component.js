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
var CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CheckboxGroupComponent; }),
    multi: true
};
var CheckboxGroupComponent = /** @class */ (function (_super) {
    __extends(CheckboxGroupComponent, _super);
    function CheckboxGroupComponent() {
        var _this = _super.call(this) || this;
        _this.selectedObj = {};
        _this.selectedValues = [];
        _this.direction = 'row'; // row or column
        _this.itemsSource = [];
        _this.displayPath = '';
        _this.valuePath = '';
        _this.valueChange = new core_1.EventEmitter();
        _this.onModelChange = function (_) { };
        _this.onModelTouched = function () { };
        return _this;
    }
    Object.defineProperty(CheckboxGroupComponent.prototype, "value", {
        get: function () {
            return this.selectedValues;
        },
        set: function (values) {
            var _this = this;
            values.forEach(function (v) { return _this.selectedObj[v] = true; });
        },
        enumerable: true,
        configurable: true
    });
    CheckboxGroupComponent.prototype.onSelectCheckbox = function (event) {
        var value = event.source.value;
        this.selectedObj[value] = event.checked;
        var selectedValues = this.extractSelectedCheckboxValues();
        this.onModelTouched();
        this.onModelChange(selectedValues);
        this.valueChange.emit(selectedValues);
    };
    CheckboxGroupComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    CheckboxGroupComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    CheckboxGroupComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    CheckboxGroupComponent.prototype.extractSelectedCheckboxValues = function () {
        var results = [];
        for (var key in this.selectedObj) {
            if (this.selectedObj[key] === true) {
                results.push(key);
            }
        }
        return results;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CheckboxGroupComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CheckboxGroupComponent.prototype, "itemsSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CheckboxGroupComponent.prototype, "displayPath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CheckboxGroupComponent.prototype, "valuePath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CheckboxGroupComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CheckboxGroupComponent.prototype, "valueChange", void 0);
    CheckboxGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-checkbox-group',
            templateUrl: './checkbox-group.component.html',
            styleUrls: ['./checkbox-group.component.scss'],
            providers: [CHECKBOX_GROUP_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], CheckboxGroupComponent);
    return CheckboxGroupComponent;
}(base_componen_1.BaseComponent));
exports.CheckboxGroupComponent = CheckboxGroupComponent;
//# sourceMappingURL=checkbox-group.component.js.map