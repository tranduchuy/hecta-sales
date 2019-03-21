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
var combo_box_module_1 = require("../../shared/components/combo-box/combo-box.module");
var material_1 = require("@angular/material");
var shared_module_1 = require("../../../@fuse/shared.module");
var user_detail_component_1 = require("./user-detail/user-detail.component");
var user_management_routing_module_1 = require("./user-management.routing.module");
var expansion_1 = require("@angular/material/expansion");
var input_text_module_1 = require("app/shared/components/input-text/input-text.module");
var input_password_module_1 = require("app/shared/components/input-password/input-password.module");
var date_picker_module_1 = require("app/shared/components/date-picker/date-picker.module");
var radio_group_module_1 = require("app/shared/components/radio-group/radio-group.module");
var user_update_password_component_1 = require("./user-update-password/user-update-password.component");
var user_list_component_1 = require("./user-list/user-list.component");
var UserManagementModule = /** @class */ (function () {
    function UserManagementModule() {
    }
    UserManagementModule = __decorate([
        core_1.NgModule({
            declarations: [user_detail_component_1.UserDetailComponent, user_update_password_component_1.UserUpdatePasswordComponent, user_list_component_1.UserListComponent],
            imports: [
                common_1.CommonModule,
                expansion_1.MatExpansionModule,
                material_1.MatFormFieldModule,
                user_management_routing_module_1.UserManagementRoutingModule,
                combo_box_module_1.ComboBoxModule,
                input_text_module_1.InputTextModule,
                input_password_module_1.InputPasswordModule,
                date_picker_module_1.DatePickerModule,
                radio_group_module_1.RadioGroupModule,
                material_1.MatButtonModule,
                material_1.MatListModule,
                material_1.MatLineModule,
                material_1.MatDialogModule,
                material_1.MatFormFieldModule,
                material_1.MatSelectModule,
                material_1.MatIconModule,
                material_1.MatCardModule,
                shared_module_1.FuseSharedModule
            ]
        })
    ], UserManagementModule);
    return UserManagementModule;
}());
exports.UserManagementModule = UserManagementModule;
//# sourceMappingURL=user-management.module.js.map