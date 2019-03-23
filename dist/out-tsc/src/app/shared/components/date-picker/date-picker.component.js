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
var material_1 = require("@angular/material");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var operators_1 = require("rxjs/operators");
var base_componen_1 = require("../base/base.componen");
var _moment = require("moment");
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DatePickerComponent; }),
    multi: true
};
exports.MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD-MM-YYYY',
        monthYearA11yLabel: 'MM YYYY'
    }
};
var DatePickerComponent = /** @class */ (function (_super) {
    __extends(DatePickerComponent, _super);
    function DatePickerComponent() {
        var _this = _super.call(this) || this;
        _this.inputControl = new forms_1.FormControl();
        _this.valueChange = new core_1.EventEmitter();
        _this.onModelChange = function (_) { };
        _this.onModelTouched = function () { };
        return _this;
    }
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        get: function () {
            return this.inputDate || null;
        },
        set: function (val) {
            this.inputDate = val;
            if (val) {
                this.inputControl.setValue(_moment(val));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inputControl.valueChanges
            .pipe(operators_1.filter(function (value) { return value; }), operators_1.map(function (value) { return value._d.getTime(); }), operators_1.distinctUntilChanged())
            .subscribe(function (value) {
            _this.onChangeInputDate(new Date(value));
        });
    };
    DatePickerComponent.prototype.onChangeInputDate = function (newDate) {
        this.writeValue(newDate);
        this.onModelTouched();
        this.onModelChange(newDate);
    };
    DatePickerComponent.prototype.onLostFocus = function () {
        this.onModelTouched();
    };
    DatePickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "minDay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "maxDay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], DatePickerComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "valueChange", void 0);
    DatePickerComponent = __decorate([
        core_1.Component({
            selector: 'app-date-picker',
            templateUrl: './date-picker.component.html',
            styleUrls: ['./date-picker.component.scss'],
            providers: [
                DATE_PICKER_VALUE_ACCESSOR,
                { provide: material_1.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [material_1.MAT_DATE_LOCALE] },
                { provide: material_1.MAT_DATE_FORMATS, useValue: exports.MY_FORMATS }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], DatePickerComponent);
    return DatePickerComponent;
}(base_componen_1.BaseComponent));
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=date-picker.component.js.map