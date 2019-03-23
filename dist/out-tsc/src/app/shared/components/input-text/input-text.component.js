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
var input_base_component_1 = require("../base/input-base.component");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var INPUT_TEXT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputTextComponent; }),
    multi: true
};
var InputTextComponent = /** @class */ (function (_super) {
    __extends(InputTextComponent, _super);
    function InputTextComponent(el) {
        var _this = _super.call(this) || this;
        _this.el = el;
        _this.innerValue = '';
        _this.valueChanged = new core_1.EventEmitter();
        _this.onModelChange = function (_) { };
        _this.onModelTouched = function () { };
        _this.blurEventListener = function () { };
        return _this;
    }
    Object.defineProperty(InputTextComponent.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (val) {
            this.innerValue = val;
        },
        enumerable: true,
        configurable: true
    });
    InputTextComponent.prototype.ngOnInit = function () {
        console.log(this.label);
    };
    InputTextComponent.prototype.onFocus = function (event) {
        _super.prototype.onFocus.call(this, event);
        var input = this.el.nativeElement.querySelector('input');
        if (!input) {
            return;
        }
        this.blurEventListener = this.onBlur.bind(this);
        input.addEventListener('blur', this.blurEventListener);
    };
    InputTextComponent.prototype.onInputBlur = function () {
    };
    InputTextComponent.prototype.ngOnDestroy = function () { };
    InputTextComponent.prototype.onInputChange = function () {
        this.writeValue(this.innerValue);
        this.onModelChange(this.innerValue);
        this.valueChanged.emit(this.innerValue);
    };
    InputTextComponent.prototype.writeValue = function (obj) {
        this.value = obj;
    };
    InputTextComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputTextComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputTextComponent.prototype.onLostFocus = function () {
        _super.prototype.onLostFocus.call(this);
        this.onModelTouched();
    };
    InputTextComponent.prototype.onBlur = function () {
        this.onLostFocus();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InputTextComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], InputTextComponent.prototype, "valueChanged", void 0);
    __decorate([
        core_1.ViewChild('label'),
        __metadata("design:type", material_1.MatLabel)
    ], InputTextComponent.prototype, "label", void 0);
    InputTextComponent = __decorate([
        core_1.Component({
            selector: 'app-input-text',
            templateUrl: './input-text.component.html',
            styleUrls: ['./input-text.component.scss'],
            providers: [INPUT_TEXT_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], InputTextComponent);
    return InputTextComponent;
}(input_base_component_1.InputTextBaseComponent));
exports.InputTextComponent = InputTextComponent;
//# sourceMappingURL=input-text.component.js.map