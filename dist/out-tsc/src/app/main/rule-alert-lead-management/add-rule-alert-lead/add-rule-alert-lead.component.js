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
var page_base_component_1 = require("../../../shared/components/base/page-base.component");
var forms_1 = require("@angular/forms");
var validator_service_1 = require("../../../shared/services/validators/validator.service");
var dialog_service_1 = require("../../../shared/components/dialog/dialog.service");
var router_1 = require("@angular/router");
var rule_alert_lead_service_1 = require("../shared/service/rule-alert-lead.service");
var http_code_constant_1 = require("../../../shared/constants/http-code.constant");
var AddRuleAlertLeadComponent = /** @class */ (function (_super) {
    __extends(AddRuleAlertLeadComponent, _super);
    function AddRuleAlertLeadComponent(fb, validatorService, dialog, router, activatedRoute, ruleAlertLeadService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.validatorService = validatorService;
        _this.dialog = dialog;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.ruleAlertLeadService = ruleAlertLeadService;
        _this.formalityConfig = {
            itemSource: [],
            selectedValue: null
        };
        _this.typeConfig = {
            itemSource: [],
            isDisabled: true
        };
        _this.cityConfig = {
            itemSource: [],
            selectedValue: null
        };
        _this.districtConfig = {
            itemSource: [],
            isDisabled: true,
            selectedValue: null
        };
        _this.projectConfig = {
            itemSource: [],
            isDisabled: true
        };
        _this.isAddMode = true; // if false -> edit mode
        _this.pageTitle = '';
        return _this;
    }
    AddRuleAlertLeadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formalityConfig.itemSource = this.ruleAlertLeadService.getFormalityList();
        this.cityConfig.itemSource = this.ruleAlertLeadService.getCityList();
        this.initFormGroup();
        this.activatedRoute.params.subscribe(function (params) {
            var id = params.id;
            if (id) {
                _this.isAddMode = false;
                var subHttp = _this.ruleAlertLeadService.getRuleAlertLeadById(id)
                    .subscribe(function (res) {
                    if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                        _this.ruleAlertLeadModel = res.data;
                        _this.initEditMode();
                    }
                    else {
                        var subDialog = _this.dialog.openWarning(res.message)
                            .subscribe(function (result) {
                            _this.goBack();
                        });
                        _this.subscriptions.push(subDialog);
                    }
                });
                _this.subscriptions.push(subHttp);
            }
            else {
                _this.isAddMode = true;
                _this.initAddMode();
            }
        });
    };
    AddRuleAlertLeadComponent.prototype.initAddMode = function () {
        this.pageTitle = 'Đăng kí nhận lead';
    };
    AddRuleAlertLeadComponent.prototype.initEditMode = function () {
        this.pageTitle = 'Chỉnh sửa nhận lead';
        this.onFormalityChange(this.ruleAlertLeadModel.formality);
        this.onCityChange(this.ruleAlertLeadModel.city);
        this.onDistrictChange(this.ruleAlertLeadModel.district);
        this.form.patchValue(Object.assign({}, this.ruleAlertLeadModel, { project: this.ruleAlertLeadModel.project._id }));
    };
    AddRuleAlertLeadComponent.prototype.onClickBackButton = function () {
        this.goBack();
    };
    AddRuleAlertLeadComponent.prototype.onClickAddButton = function () {
        var _this = this;
        var rule = this.getFormValue();
        this.markAsTouchedForAll(this.form);
        if (this.form.invalid) {
            return;
        }
        var subHttp = this.ruleAlertLeadService.addRuleAlertLead(rule)
            .subscribe(function (res) {
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                var subDialog = _this.dialog.openInfo('Bạn đã đăng kí nhận thông tin lead thành công!')
                    .subscribe(function (result) {
                    _this.goBack();
                });
                _this.subscriptions.push(subDialog);
            }
        }, function (error) {
            var subDialog = _this.dialog.openWarning(error)
                .subscribe(function (result) {
                console.log(result);
            });
            _this.subscriptions.push(subDialog);
        });
        this.subscriptions.push(subHttp);
    };
    AddRuleAlertLeadComponent.prototype.onClickEditButton = function () {
        var _this = this;
        var rule = this.getFormValue();
        rule.ruleId = this.ruleAlertLeadModel._id;
        this.markAsTouchedForAll(this.form);
        if (this.form.invalid) {
            return;
        }
        var subHttp = this.ruleAlertLeadService.updateRuleAlertLead(rule)
            .subscribe(function (res) {
            var subDialog;
            if (res.status === http_code_constant_1.HTTP_CODES.SUCCESS) {
                subDialog = _this.dialog.openInfo('Bạn đã cập nhật nhận lead thành công!')
                    .subscribe(function (result) {
                    _this.goBack();
                });
            }
            else {
                subDialog = _this.dialog.openWarning(res.message)
                    .subscribe(function (result) {
                    _this.goBack();
                });
            }
            _this.subscriptions.push(subDialog);
        });
        this.subscriptions.push(subHttp);
    };
    AddRuleAlertLeadComponent.prototype.onFormalityChange = function (selectedValue) {
        this.form.controls['type'].setValue(null);
        if (!selectedValue) {
            this.typeConfig = {
                itemSource: [],
                isDisabled: true
            };
            return;
        }
        this.formalityConfig.selectedValue = selectedValue;
        var selectedFormality = this.ruleAlertLeadService.getFormalityById(selectedValue);
        this.typeConfig = {
            itemSource: selectedFormality.children || [],
            isDisabled: false
        };
    };
    AddRuleAlertLeadComponent.prototype.onCityChange = function (selectedValue) {
        this.projectConfig = {
            itemSource: [],
            isDisabled: true
        };
        this.form.controls['project'].setValue(null);
        this.form.controls['district'].setValue(null);
        if (!selectedValue) {
            this.districtConfig = {
                itemSource: [],
                isDisabled: true,
                selectedValue: null
            };
            return;
        }
        this.cityConfig.selectedValue = selectedValue;
        this.districtConfig = {
            itemSource: this.ruleAlertLeadService.getDistrictListByCityCode(selectedValue),
            isDisabled: false,
            selectedValue: null
        };
    };
    AddRuleAlertLeadComponent.prototype.onDistrictChange = function (selectedValue) {
        this.form.controls['project'].setValue(null);
        if (!selectedValue) {
            this.projectConfig = {
                itemSource: [],
                isDisabled: true
            };
            return;
        }
        this.districtConfig.selectedValue = selectedValue;
        this.projectConfig = {
            itemSource: this.ruleAlertLeadService.getProjectListByCityCodeAndDistrictId(this.cityConfig.selectedValue, selectedValue),
            isDisabled: false
        };
    };
    AddRuleAlertLeadComponent.prototype.getFormValue = function () {
        return {
            formality: this.form.value.formality,
            type: this.form.value.type,
            city: this.form.value.city,
            district: this.form.value.district,
            project: this.form.value.project
        };
    };
    AddRuleAlertLeadComponent.prototype.initFormGroup = function () {
        this.form = this.fb.group({
            formality: [null, this.validatorService.getInputRequired()],
            type: [null, this.validatorService.getInputRequired()],
            city: [null, this.validatorService.getInputRequired()],
            district: [null, this.validatorService.getInputRequired()],
            project: [null, this.validatorService.getInputRequired()]
        });
    };
    AddRuleAlertLeadComponent.prototype.goBack = function () {
        this.router.navigate(['/rule-alert-lead/list']);
    };
    AddRuleAlertLeadComponent = __decorate([
        core_1.Component({
            selector: 'app-add-rule-alert-lead',
            templateUrl: './add-rule-alert-lead.component.html',
            styleUrls: ['./add-rule-alert-lead.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            validator_service_1.ValidatorService,
            dialog_service_1.DialogService,
            router_1.Router,
            router_1.ActivatedRoute,
            rule_alert_lead_service_1.RuleAlertLeadService])
    ], AddRuleAlertLeadComponent);
    return AddRuleAlertLeadComponent;
}(page_base_component_1.PageBaseComponent));
exports.AddRuleAlertLeadComponent = AddRuleAlertLeadComponent;
//# sourceMappingURL=add-rule-alert-lead.component.js.map