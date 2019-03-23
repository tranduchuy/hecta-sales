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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var input_text_component_1 = require("../input-text/input-text.component");
var INPUT_TEXT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputPasswordComponent; }),
    multi: true
};
var InputPasswordComponent = /** @class */ (function (_super) {
    __extends(InputPasswordComponent, _super);
    function InputPasswordComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputPasswordComponent.prototype.ngOnInit = function () {
        var input = this.el.nativeElement.querySelector('input');
        if (!input) {
            return;
        }
        input.type = 'password';
    };
    InputPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-input-password',
            templateUrl: './input-password.component.html',
            styleUrls: ['./input-password.component.scss'],
            providers: [INPUT_TEXT_VALUE_ACCESSOR]
        })
    ], InputPasswordComponent);
    return InputPasswordComponent;
}(input_text_component_1.InputTextComponent));
exports.InputPasswordComponent = InputPasswordComponent;
//# sourceMappingURL=input-password.component.js.map