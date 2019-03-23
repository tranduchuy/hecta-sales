"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_service_1 = require("../../services/message/message.service");
var validator_service_1 = require("../../services/validators/validator.service");
var auto_complete_module_1 = require("../auto-complete/auto-complete.module");
var checkbox_group_module_1 = require("../checkbox-group/checkbox-group.module");
var combo_box_module_1 = require("../combo-box/combo-box.module");
var date_picker_module_1 = require("../date-picker/date-picker.module");
var input_password_module_1 = require("../input-password/input-password.module");
var radio_group_module_1 = require("../radio-group/radio-group.module");
var component_list_component_1 = require("./component-list.component");
var common_1 = require("@angular/common");
var component_list_routing_module_1 = require("./component-list-routing.module");
var input_text_module_1 = require("../input-text/input-text.module");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var ComponentListModule = /** @class */ (function () {
    function ComponentListModule() {
    }
    ComponentListModule = __decorate([
        core_1.NgModule({
            declarations: [component_list_component_1.ComponentListComponent],
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                component_list_routing_module_1.ComponentListRoutingModule,
                input_text_module_1.InputTextModule,
                input_password_module_1.InputPasswordModule,
                radio_group_module_1.RadioGroupModule,
                checkbox_group_module_1.CheckboxGroupModule,
                combo_box_module_1.ComboBoxModule,
                auto_complete_module_1.AutoCompleteModule,
                date_picker_module_1.DatePickerModule,
                material_1.MatGridListModule,
                material_1.MatListModule,
                material_1.MatButtonModule
            ],
            providers: [
                validator_service_1.ValidatorService,
                message_service_1.MessageService
            ],
            exports: []
        })
    ], ComponentListModule);
    return ComponentListModule;
}());
exports.ComponentListModule = ComponentListModule;
//# sourceMappingURL=component-list.module.js.map