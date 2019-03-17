import { Component, Input } from '@angular/core';
import { PageBaseComponent } from '../../../shared/components/base/page-base.component';
import { LeadResponse } from '../shared/model/LeadResponse';
import { LeadType } from '../shared/lead.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent extends PageBaseComponent {
  @Input() lead: LeadResponse;
  @Input() leadType: number;
  LEAD_TYPE = LeadType;

  constructor(private router: Router) {
    super();
  }

  onClickRegisterAlertLead(): void {}

  onClickLeadDetails(): void {
    this.router.navigate(['/khach-hang-tiem-nang/' + this.lead._id]);
  }

  onClickReturnLead(): void {

  }
}
