"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var add_rule_alert_lead_component_1 = require("./add-rule-alert-lead/add-rule-alert-lead.component");
var rule_alert_lead_list_component_1 = require("./rule-alert-lead-list/rule-alert-lead-list.component");
var routes = [
    {
        path: 'add',
        component: add_rule_alert_lead_component_1.AddRuleAlertLeadComponent,
        data: {
            level: 2
        }
    }, {
        path: 'update/:id',
        component: add_rule_alert_lead_component_1.AddRuleAlertLeadComponent,
        data: {
            level: 2
        }
    },
    {
        path: 'list',
        component: rule_alert_lead_list_component_1.RuleAlertLeadListComponent,
        data: {
            level: 1
        }
    }
];
var RuleAlertLeadManagementRoutingModule = /** @class */ (function () {
    function RuleAlertLeadManagementRoutingModule() {
    }
    RuleAlertLeadManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], RuleAlertLeadManagementRoutingModule);
    return RuleAlertLeadManagementRoutingModule;
}());
exports.RuleAlertLeadManagementRoutingModule = RuleAlertLeadManagementRoutingModule;
//# sourceMappingURL=rule-alert-lead-management-routing.module.js.map