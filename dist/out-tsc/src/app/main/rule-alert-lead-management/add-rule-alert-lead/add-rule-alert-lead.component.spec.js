"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var add_rule_alert_lead_component_1 = require("./add-rule-alert-lead.component");
describe('AddRuleAlertLeadComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [add_rule_alert_lead_component_1.AddRuleAlertLeadComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(add_rule_alert_lead_component_1.AddRuleAlertLeadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-rule-alert-lead.component.spec.js.map