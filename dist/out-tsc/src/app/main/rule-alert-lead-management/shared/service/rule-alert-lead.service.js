"use strict";
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
var selector_constant_1 = require("../../../../shared/constants/selector.constant");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../../../environments/environment");
var url_constant_1 = require("../../../../shared/constants/url.constant");
var RuleAlertLeadService = /** @class */ (function () {
    function RuleAlertLeadService(httpClient) {
        this.httpClient = httpClient;
        this.cateDataSource = selector_constant_1.default.cateListBuy;
        this.cityDistrictProjectDataSource = selector_constant_1.default.cityDistrictProject;
    }
    RuleAlertLeadService.prototype.getRuleAlertLeadById = function (id) {
        return this.httpClient.get(environment_1.environment.apiEndpoint + url_constant_1.URLs.RULE_ALERT_LEAD + ("/" + id));
    };
    RuleAlertLeadService.prototype.addRuleAlertLead = function (rule) {
        return this.httpClient.post(environment_1.environment.apiEndpoint + url_constant_1.URLs.RULE_ALERT_LEAD, rule);
    };
    RuleAlertLeadService.prototype.updateRuleAlertLead = function (rule) {
        return this.httpClient.put(environment_1.environment.apiEndpoint + url_constant_1.URLs.RULE_ALERT_LEAD, rule);
    };
    RuleAlertLeadService.prototype.deleteRuleAlertLead = function (ruleId) {
        return this.httpClient.delete(environment_1.environment.apiEndpoint + url_constant_1.URLs.RULE_ALERT_LEAD + ("/" + ruleId));
    };
    RuleAlertLeadService.prototype.getRuleAlertLeadList = function (params) {
        return this.httpClient.get(environment_1.environment.apiEndpoint + url_constant_1.URLs.RULE_ALERT_LEAD, {
            params: params
        });
    };
    RuleAlertLeadService.prototype.getRuleAlertLeadFullDetails = function (rule) {
        return {
            id: rule._id,
            formality: this.getFormalityById(rule.formality) || {},
            type: this.getTypeByFormalityIdAndTypeId(rule.formality, rule.type) || {},
            city: this.getCityByCode(rule.city) || {},
            district: this.getDistrictByCityCodeAndDistrictId(rule.city, rule.district) || {},
            project: this.getProjectByCityCodeAndDistrictIdAndProjectId(rule.city, rule.district, rule.project._id) || {}
        };
    };
    RuleAlertLeadService.prototype.getRuleAlertLeadLiteDetails = function (rule) {
        var ruleFullDetails = this.getRuleAlertLeadFullDetails(rule);
        return {
            id: rule._id,
            formalityName: ruleFullDetails.formality.name,
            typeName: ruleFullDetails.type.name,
            cityName: ruleFullDetails.city.name,
            districtName: ruleFullDetails.district.name,
            projectName: ruleFullDetails.project.name
        };
    };
    RuleAlertLeadService.prototype.getFormalityById = function (id) {
        return this.cateDataSource.find(function (cate) { return cate.id === id; });
    };
    RuleAlertLeadService.prototype.getTypeListByFormalityId = function (formalityId) {
        return ((this.getFormalityById(formalityId) || {}).children || []);
    };
    RuleAlertLeadService.prototype.getTypeByFormalityIdAndTypeId = function (formalityId, typeId) {
        var typeList = this.getTypeListByFormalityId(formalityId);
        return typeList.find(function (type) { return type.id === typeId; });
    };
    RuleAlertLeadService.prototype.getCityByCode = function (code) {
        return this.cityDistrictProjectDataSource.find(function (city) { return city.code === code; });
    };
    RuleAlertLeadService.prototype.getDistrictListByCityCode = function (code) {
        return ((this.getCityByCode(code) || {}).district || []);
    };
    RuleAlertLeadService.prototype.getDistrictByCityCodeAndDistrictId = function (cityCode, disId) {
        var districtList = this.getDistrictListByCityCode(cityCode);
        return districtList.find(function (dis) { return dis.id === disId; });
    };
    RuleAlertLeadService.prototype.getProjectListByCityCodeAndDistrictId = function (code, districtId) {
        return ((this.getDistrictByCityCodeAndDistrictId(code, districtId) || {}).project || []);
    };
    RuleAlertLeadService.prototype.getProjectByCityCodeAndDistrictIdAndProjectId = function (cityCode, disId, projectId) {
        var projectList = this.getProjectListByCityCodeAndDistrictId(cityCode, disId);
        return projectList.find(function (project) { return project._id === projectId; });
    };
    RuleAlertLeadService.prototype.getFormalityList = function () {
        return this.cateDataSource;
    };
    RuleAlertLeadService.prototype.getCityList = function () {
        return this.cityDistrictProjectDataSource;
    };
    RuleAlertLeadService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RuleAlertLeadService);
    return RuleAlertLeadService;
}());
exports.RuleAlertLeadService = RuleAlertLeadService;
//# sourceMappingURL=rule-alert-lead.service.js.map