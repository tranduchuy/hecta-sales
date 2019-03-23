"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rule_alert_lead_list_component_1 = require("./rule-alert-lead-list.component");
describe('RuleAlertLeadListComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [rule_alert_lead_list_component_1.RuleAlertLeadListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(rule_alert_lead_list_component_1.RuleAlertLeadListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=rule-alert-lead-list.component.spec.js.map