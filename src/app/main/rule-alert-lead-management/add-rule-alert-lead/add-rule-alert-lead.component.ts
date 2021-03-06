import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleAlertLeadService } from '../shared/service/rule-alert-lead.service';
import { RuleAlertLeadRequest } from '../shared/model/rule-alert-lead-request';
import { RuleAlertLeadResponse } from '../shared/model/rule-alert-lead-response';
import { HTTP_CODES } from '../../../shared/constants/http-code.constant';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-add-rule-alert-lead',
  templateUrl: './add-rule-alert-lead.component.html',
  styleUrls: ['./add-rule-alert-lead.component.scss']
})
export class AddRuleAlertLeadComponent extends PageBaseComponent implements OnInit {

  form: FormGroup;

  formalityConfig = {
    itemSource: [],
    selectedValue: null
  };

  typeConfig = {
    itemSource: [],
    isDisabled: true
  };

  cityConfig = {
    itemSource: [],
    selectedValue: null
  };

  districtConfig = {
    itemSource: [],
    isDisabled: true,
    selectedValue: null
  };

  projectConfig = {
    itemSource: [],
    isDisabled: true
  };

  ruleAlertLeadModel: RuleAlertLeadResponse;
  isAddMode = true; // if false -> edit mode
  pageTitle = '';

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private dialog: DialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fuseProgressBarService: FuseProgressBarService,
              private ruleAlertLeadService: RuleAlertLeadService) {
    super();
  }

  ngOnInit(): void {
    this.fuseProgressBarService.show();
    this.formalityConfig.itemSource = this.ruleAlertLeadService.getFormalityList();
    this.cityConfig.itemSource = this.ruleAlertLeadService.getCityList();
    this.initFormGroup();

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.isAddMode = false;
        this.fuseProgressBarService.show();
        const subHttp = this.ruleAlertLeadService.getRuleAlertLeadById(id)
          .subscribe((res: any) => {
            if (res.status === HTTP_CODES.SUCCESS) {
              this.ruleAlertLeadModel = res.data;
              this.initEditMode();
            } else {
              const subDialog = this.dialog.openWarning(res.message)
                .subscribe((result: DialogResult) => {
                  this.gotoListLead();
                });
              this.subscriptions.push(subDialog);
            }
          });
        this.fuseProgressBarService.hide();
        this.subscriptions.push(subHttp);
      } else {
        this.isAddMode = true;
        this.initAddMode();
      }
    });
    this.fuseProgressBarService.hide();
  }

  initAddMode(): void {
    this.pageTitle = '????ng k?? nh???n lead';
  }

  initEditMode(): void {
    this.pageTitle = 'Ch???nh s???a nh???n lead';
    this.onFormalityChange(this.ruleAlertLeadModel.formality);
    this.onCityChange(this.ruleAlertLeadModel.city);
    this.onDistrictChange(this.ruleAlertLeadModel.district);

    this.form.patchValue(Object.assign({}, this.ruleAlertLeadModel, {project: this.ruleAlertLeadModel.project._id}));
  }

  onClickAddButton(): void {
    const rule: RuleAlertLeadRequest = this.getFormValue();
    this.markAsTouchedForAll(this.form);
    if (this.form.invalid) {
      return;
    }

    this.fuseProgressBarService.show();
    const subHttp = this.ruleAlertLeadService.addRuleAlertLead(rule)
      .subscribe(res => {
        this.fuseProgressBarService.hide();
        if (res.status === HTTP_CODES.SUCCESS) {
          const subDialog = this.dialog.openInfo('B???n ???? ????ng k?? nh???n th??ng tin lead th??nh c??ng!')
            .subscribe((result: DialogResult) => {
              this.gotoListLead();
            });
          this.subscriptions.push(subDialog);
        }
      }, error => {
        const subDialog = this.dialog.openWarning(error)
          .subscribe((result: DialogResult) => {
            console.log(result);
          });
        this.subscriptions.push(subDialog);
      });

    this.subscriptions.push(subHttp);
  }

  onClickEditButton(): void {
    const rule: RuleAlertLeadRequest = this.getFormValue();
    rule.ruleId = this.ruleAlertLeadModel._id;

    this.markAsTouchedForAll(this.form);
    if (this.form.invalid) {
      return;
    }

    this.fuseProgressBarService.show();
    const subHttp = this.ruleAlertLeadService.updateRuleAlertLead(rule)
      .subscribe(res => {
        this.fuseProgressBarService.hide();
        let subDialog;
        if (res.status === HTTP_CODES.SUCCESS) {
          subDialog = this.dialog.openInfo('B???n ???? c???p nh???t nh???n lead th??nh c??ng!')
            .subscribe((result: DialogResult) => {
              this.gotoListLead();
            });
        } else {
          subDialog = this.dialog.openWarning(res.message)
            .subscribe((result: DialogResult) => {
              this.gotoListLead();
            });
        }
        this.subscriptions.push(subDialog);
      });

    this.subscriptions.push(subHttp);
  }

  onFormalityChange(selectedValue): void {
    this.form.controls['type'].setValue(null);

    if (!selectedValue) {
      this.typeConfig = {
        itemSource: [],
        isDisabled: true
      };
      return;
    }

    this.formalityConfig.selectedValue = selectedValue;
    const selectedFormality: any = this.ruleAlertLeadService.getFormalityById(selectedValue);

    this.typeConfig = {
      itemSource: selectedFormality.children || [],
      isDisabled: false
    };
  }

  onCityChange(selectedValue: any): void {
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
  }

  onDistrictChange(selectedValue: any): void {
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
  }

  private getFormValue(): RuleAlertLeadRequest {
    return {
      formality: this.form.value.formality,
      type: this.form.value.type,
      city: this.form.value.city,
      district: this.form.value.district,
      project: this.form.value.project
    };
  }

  private initFormGroup(): void {
    this.form = this.fb.group({
      formality: [null, this.validatorService.getInputRequired()],
      type: [null, this.validatorService.getInputRequired()],
      city: [null, this.validatorService.getInputRequired()],
      district: [null, this.validatorService.getInputRequired()],
      project: [null]
    });
  }

  private gotoListLead(): void {
    this.router.navigate(['/rule-alert-lead/list']);
  }
}
