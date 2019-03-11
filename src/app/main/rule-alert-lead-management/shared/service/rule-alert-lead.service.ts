import { Injectable } from '@angular/core';
import result from '../../../../shared/constants/selector.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { URLs } from '../../../../shared/constants/url.constant';
import { RuleAlertLeadRequest } from '../model/rule-alert-lead-request';
import { RuleAlertLeadResponse } from '../model/rule-alert-lead-response';

@Injectable({
  providedIn: 'root'
})
export class RuleAlertLeadService {
  private cateDataSource = result.cateListBuy;
  private cityDistrictProjectDataSource = result.cityDistrictProject;

  constructor(private httpClient: HttpClient) {
  }

  getRuleAlertLeadById(id: string): Observable<RuleAlertLeadResponse> {
    return this.httpClient.get(environment.apiEndpoint + URLs.RULE_ALERT_LEAD + `/${id}`);
  }

  addRuleAlertLead(rule: RuleAlertLeadRequest): Observable<any> {
    return this.httpClient.post(environment.apiEndpoint + URLs.RULE_ALERT_LEAD, rule);
  }

  updateRuleAlertLead(rule: RuleAlertLeadRequest): Observable<any> {
    return this.httpClient.put(environment.apiEndpoint + URLs.RULE_ALERT_LEAD, rule);
  }

  deleteRuleAlertLead(ruleId: string): Observable<any> {
    return this.httpClient.delete(environment.apiEndpoint + URLs.RULE_ALERT_LEAD + `/${ruleId}`);
  }

  getRuleAlertLeadList(params?: any): Observable<any> {
    return this.httpClient.get(environment.apiEndpoint + URLs.RULE_ALERT_LEAD, {
      params: params
    });
  }

  getRuleAlertLeadFullDetails(rule: RuleAlertLeadResponse): any {
    return {
      id: rule._id,
      formality: this.getFormalityById(rule.formality) || {},
      type: this.getTypeByFormalityIdAndTypeId(rule.formality, rule.type) || {},
      city: this.getCityByCode(rule.city) || {},
      district: this.getDistrictByCityCodeAndDistrictId(rule.city, rule.district) || {},
      project: this.getProjectByCityCodeAndDistrictIdAndProjectId(rule.city, rule.district, rule.project._id) || {}
    };
  }

  getRuleAlertLeadLiteDetails(rule: RuleAlertLeadResponse): any {
    const ruleFullDetails = this.getRuleAlertLeadFullDetails(rule);
    return {
      id: rule._id,
      formalityName: ruleFullDetails.formality.name,
      typeName: ruleFullDetails.type.name,
      cityName: ruleFullDetails.city.name,
      districtName: ruleFullDetails.district.name,
      projectName: ruleFullDetails.project.name
    };
  }

  getFormalityById(id: number): any {
    return this.cateDataSource.find(cate => cate.id === id);
  }

  getTypeListByFormalityId(formalityId: number): any[] {
    return ((this.getFormalityById(formalityId) || {}).children || []);
  }

  getTypeByFormalityIdAndTypeId(formalityId: number, typeId: number): any {
    const typeList = this.getTypeListByFormalityId(formalityId);
    return typeList.find(type => type.id === typeId);
  }

  getCityByCode(code: string): any {
    return this.cityDistrictProjectDataSource.find(city => city.code === code);
  }

  getDistrictListByCityCode(code: string): any[] {
    return ((this.getCityByCode(code) || {}).district || []);
  }

  getDistrictByCityCodeAndDistrictId(cityCode: string, disId: number): any {
    const districtList = this.getDistrictListByCityCode(cityCode);
    return districtList.find(dis => dis.id === disId);
  }

  getProjectListByCityCodeAndDistrictId(code: string, districtId: number): any[] {
    return ((this.getDistrictByCityCodeAndDistrictId(code, districtId) || {}).project || []);
  }

  getProjectByCityCodeAndDistrictIdAndProjectId(cityCode: string, disId: number, projectId: string): any {
    const projectList = this.getProjectListByCityCodeAndDistrictId(cityCode, disId);
    return projectList.find(project => project._id === projectId);
  }

  getFormalityList(): any {
    return this.cateDataSource;
  }

  getCityList(): any {
    return this.cityDistrictProjectDataSource;
  }
}
