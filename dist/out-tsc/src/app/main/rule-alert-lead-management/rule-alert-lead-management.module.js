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
var rule_alert_lead_management_routing_module_1 = require("./rule-alert-lead-management-routing.module");
var add_rule_alert_lead_component_1 = require("./add-rule-alert-lead/add-rule-alert-lead.component");
var combo_box_module_1 = require("../../shared/components/combo-box/combo-box.module");
var material_1 = require("@angular/material");
var rule_alert_lead_list_component_1 = require("./rule-alert-lead-list/rule-alert-lead-list.component");
var shared_module_1 = require("../../../@fuse/shared.module");
var RuleAlertLeadManagementModule = /** @class */ (function () {
    function RuleAlertLeadManagementModule() {
    }
    RuleAlertLeadManagementModule = __decorate([
        core_1.NgModule({
            declarations: [add_rule_alert_lead_component_1.AddRuleAlertLeadComponent, rule_alert_lead_list_component_1.RuleAlertLeadListComponent],
            imports: [
                common_1.CommonModule,
                rule_alert_lead_management_routing_module_1.RuleAlertLeadManagementRoutingModule,
                combo_box_module_1.ComboBoxModule,
                material_1.MatButtonModule,
                material_1.MatListModule,
                material_1.MatLineModule,
                material_1.MatDialogModule,
                material_1.MatFormFieldModule,
                material_1.MatSelectModule,
                material_1.MatIconModule,
                shared_module_1.FuseSharedModule
            ]
        })
    ], RuleAlertLeadManagementModule);
    return RuleAlertLeadManagementModule;
}());
exports.RuleAlertLeadManagementModule = RuleAlertLeadManagementModule;
//# sourceMappingURL=rule-alert-lead-management.module.js.map