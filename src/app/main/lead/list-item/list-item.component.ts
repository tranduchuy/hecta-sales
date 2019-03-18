import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { LeadResponse } from '../shared/model/LeadResponse';
import { LeadType } from '../shared/lead.type';

@Component({
  selector: 'app-lead-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent extends PageBaseComponent {
  @Input() lead: LeadResponse;
  @Input() leadType: number;
  LEAD_TYPE = LeadType;

  onClickRegisterAlertLead(): void {
  }

  onClickLeadDetails(): void {
  }

  onClickReturnLead(): void {

  }
}
