"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var input_password_component_1 = require("./input-password.component");
var InputPasswordModule = /** @class */ (function () {
    function InputPasswordModule() {
    }
    InputPasswordModule = __decorate([
        core_1.NgModule({
            declarations: [
                input_password_component_1.InputPasswordComponent
            ],
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                material_1.MatInputModule,
                material_1.MatFormFieldModule,
                material_1.MatIconModule
            ],
            exports: [
                input_password_component_1.InputPasswordComponent
            ],
            providers: []
        })
    ], InputPasswordModule);
    return InputPasswordModule;
}());
exports.InputPasswordModule = InputPasswordModule;
//# sourceMappingURL=input-password.module.js.map