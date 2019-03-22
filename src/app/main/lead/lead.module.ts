import { NgModule } from '@angular/core';
import { LeadListComponent } from './list/lead-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeadRoutingModule } from './lead-routing.module';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { ListItemComponent } from './list-item/list-item.component';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { LeadDetailsComponent } from './lead-details/lead-details.component';

@NgModule({
  declarations: [
    LeadListComponent,
    ListItemComponent,
    LeadDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeadRoutingModule,
    FuseSharedModule,
    MatTabsModule,
    MatButtonModule,
  ],
  exports: []
})
export class LeadModule {

}
