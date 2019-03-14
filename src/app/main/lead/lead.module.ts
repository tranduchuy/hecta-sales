import { NgModule } from '@angular/core';
import { LeadListComponent } from './list/lead-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeadRoutingModule } from './lead-routing.module';
import { MatTabsModule } from '@angular/material';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    LeadListComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeadRoutingModule,
    MatTabsModule
  ],
  exports: []
})
export class LeadModule {

}
