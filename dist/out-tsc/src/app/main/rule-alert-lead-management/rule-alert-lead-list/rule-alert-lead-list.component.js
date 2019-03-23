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
var router_1 = require("@angular/router");
var rule_alert_lead_service_1 = require("../shared/service/rule-alert-lead.service");
var page_base_component_1 = require("../../../shared/components/base/page-base.component");
var dialog_service_1 = require("../../../shared/components/dialog/dialog.service");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var RuleAlertLeadListComponent = /** @class */ (function (_super) {
    __extends(RuleAlertLeadListComponent, _super);
    function RuleAlertLeadListComponent(router, service, dialog) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.service = service;
        _this.dialog = dialog;
        return _this;
    }
    RuleAlertLeadListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sub = this.service.getRuleAlertLeadList().subscribe(function (res) {
            _this.ruleAlertLeadDetailsList = res.data.entries
                .map(function (entry) { return _this.service.getRuleAlertLeadLiteDetails(entry); });
        });
        this.subscriptions.push(sub);
    };
    RuleAlertLeadListComponent.prototype.onClickAddRule = function () {
        this.router.navigate(['/rule-alert-lead/add']);
    };
    RuleAlertLeadListComponent.prototype.onClickEditRule = function (rule) {
        console.log(rule);
        this.router.navigate(['/rule-alert-lead/update/' + rule.id]);
    };
    RuleAlertLeadListComponent.prototype.onClickDeleteRule = function (rule) {
        var self = this;
        var confirmMessage = "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00F3a nh\u1EADn lead d\u1EF1 \u00E1n " + rule.projectName + ", " + rule.districtName + ", " + rule.cityName + "?";
        var subDialog = this.dialog.openConfirm(confirmMessage)
            .subscribe(function (result) {
            if (result === dialog_service_1.DialogResult.OK) {
                var subHttp = self.service.deleteRuleAlertLead(rule.id)
                    .subscribe(function (res) {
                    if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                        self.ngOnInit();
                        var successMessage = "B\u1EA1n \u0111\u00E3 x\u00F3a nh\u1EADn lead d\u1EF1 \u00E1n " + rule.projectName + ", " + rule.districtName + ", " + rule.cityName + " th\u00E0nh c\u00F4ng!";
                        self.dialog.openInfo(successMessage).subscribe().unsubscribe();
                    }
                });
                self.subscriptions.push(subHttp);
            }
        });
        this.subscriptions.push(subDialog);
    };
    RuleAlertLeadListComponent = __decorate([
        core_1.Component({
            selector: 'app-rule-alert-lead-list',
            templateUrl: './rule-alert-lead-list.component.html',
            styleUrls: ['./rule-alert-lead-list.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, rule_alert_lead_service_1.RuleAlertLeadService,
            dialog_service_1.DialogService])
    ], RuleAlertLeadListComponent);
    return RuleAlertLeadListComponent;
}(page_base_component_1.PageBaseComponent));
exports.RuleAlertLeadListComponent = RuleAlertLeadListComponent;
//# sourceMappingURL=rule-alert-lead-list.component.js.map