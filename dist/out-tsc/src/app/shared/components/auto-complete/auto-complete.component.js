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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var base_componen_1 = require("../base/base.componen");
var AUTO_COMPLETE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AutoCompleteComponent; }),
    multi: true
};
var AutoCompleteComponent = /** @class */ (function (_super) {
    __extends(AutoCompleteComponent, _super);
    function AutoCompleteComponent() {
        var _this = _super.call(this) || this;
        _this._itemsSource = [];
        _this.inputControl = new forms_1.FormControl();
        _this.filteredOptions = rxjs_1.of([]);
        _this.displayPath = '';
        _this.valuePath = '';
        _this.icon = '';
        _this.valueChange = new core_1.EventEmitter();
        _this.onModelChange = function (_) { };
        _this.onModelTouched = function () { };
        return _this;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "itemsSource", {
        get: function () {
            return this._itemsSource;
        },
        set: function (items) {
            var _this = this;
            setTimeout(function () {
                _this._itemsSource = items.map(function (item) {
                    var _a;
                    return _a = {},
                        _a[_this.displayPath] = item[_this.displayPath],
                        _a[_this.valuePath] = item[_this.valuePath],
                        _a;
                });
                console.log(_this._itemsSource);
                _this.inputControl.setValue('');
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "value", {
        get: function () {
            return this.inputControl.value || '';
        },
        set: function (val) {
            var selectedItem = this.getSelectedOption(this.valuePath, val);
            if (selectedItem) {
                this.triggerAutocompleteInput.writeValue(selectedItem);
            }
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteComponent.prototype.onLostFocus = function () {
        // this.onModelTouched();
        // super.onLostFocus();
    };
    AutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredOptions = this.inputControl.valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return typeof value === 'string' ? value : value.name; }), operators_1.map(function (name) { return name ? _this._filter(name) : _this._itemsSource.slice(); }));
    };
    AutoCompleteComponent.prototype.onSelectOption = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.inputControl.setValue(event.option.value[_this.displayPath]);
            var selectedOption = event.option.value;
            if (selectedOption) {
                _this.onModelChange(selectedOption[_this.valuePath]);
                _this.valueChange.emit(selectedOption[_this.valuePath]);
                _this.writeValue(selectedOption[_this.valuePath]);
            }
            else {
                _this.onModelChange(null);
                _this.valueChange.emit(null);
                _this.writeValue(null);
            }
        });
    };
    AutoCompleteComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    AutoCompleteComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AutoCompleteComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AutoCompleteComponent.prototype.displayFn = function () {
        var displayPath = this.displayPath;
        // cannot use "this" in returned function cause this will be bind as component mat-autocomplete
        return function (item) {
            return item ? item[displayPath] : undefined;
        };
    };
    AutoCompleteComponent.prototype._filter = function (name) {
        var _this = this;
        var filterValue = name.toLowerCase();
        var result = this.itemsSource.filter(function (option) { return option[_this.displayPath].toLowerCase().indexOf(filterValue) === 0; });
        return result;
    };
    AutoCompleteComponent.prototype.getSelectedOption = function (field, val) {
        var _this = this;
        return this.itemsSource.find(function (item) {
            return item[field] === (val || _this.inputControl.value);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AutoCompleteComponent.prototype, "itemsSource", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "displayPath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "valuePath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AutoCompleteComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.ViewChild('matAutoCompleteTrigger', { read: material_1.MatAutocompleteTrigger }),
        __metadata("design:type", material_1.MatAutocompleteTrigger)
    ], AutoCompleteComponent.prototype, "triggerAutocompleteInput", void 0);
    AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'app-auto-complete',
            templateUrl: './auto-complete.component.html',
            styleUrls: ['./auto-complete.component.scss'],
            providers: [AUTO_COMPLETE_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}(base_componen_1.BaseComponent));
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=auto-complete.component.js.map