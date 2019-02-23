import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { DialogResult, DialogService } from '../../../shared/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { RuleAlertLeadService } from '../shared/service/rule-alert-lead.service';
import { RuleAlertLead } from '../shared/model/rule-alert-lead';

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

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private dialog: DialogService,
              private router: Router,
              private ruleAlertLeadService: RuleAlertLeadService) {
    super();
    this.initFormGroup();
  }

  ngOnInit(): void {
    this.formalityConfig.itemSource = this.ruleAlertLeadService.getFormalityList();
    this.cityConfig.itemSource = this.ruleAlertLeadService.getCityList();
  }

  onClickBackButton(): void {
    this.router.navigate(['/rule-alert-lead/list']);
  }

  onClickAddButton(): void {
    const rule: RuleAlertLead = this.getFormValue();
    this.markAsTouchedForAll(this.form);
    if (this.form.invalid) {
      console.log('form invalid', this.form);
      return;
    }

    const subHttp = this.ruleAlertLeadService.addRuleAlertLead(rule)
      .subscribe(res => {
        if (res.status === 1) {
          const subDialog = this.dialog.openInfo('Bạn đã đăng kí nhận thông tin lead thành công!')
            .subscribe((result: DialogResult) => {
              this.router.navigate(['/rule-alert-lead/list']);
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

  private getFormValue(): RuleAlertLead {
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
      project: [null, this.validatorService.getInputRequired()]
    });
  }
}
