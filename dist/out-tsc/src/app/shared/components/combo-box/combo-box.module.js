"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var combo_box_component_1 = require("./combo-box.component");
var ComboBoxModule = /** @class */ (function () {
    function ComboBoxModule() {
    }
    ComboBoxModule = __decorate([
        core_1.NgModule({
            declarations: [combo_box_component_1.ComboBoxComponent],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatFormFieldModule,
                material_1.MatSelectModule,
                material_1.MatIconModule
            ],
            exports: [combo_box_component_1.ComboBoxComponent]
        })
    ], ComboBoxModule);
    return ComboBoxModule;
}());
exports.ComboBoxModule = ComboBoxModule;
//# sourceMappingURL=combo-box.module.js.map