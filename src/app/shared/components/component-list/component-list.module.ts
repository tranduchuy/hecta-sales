import { NgModule } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { ValidatorService } from '../../services/validators/validator.service';
import { ComponentListComponent } from './component-list.component';
import { CommonModule } from '@angular/common';
import { ComponentListRoutingModule } from './component-list-routing.module';
import { InputTextModule } from '../input-text/input-text.module';
import { MatGridListModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ComponentListComponent],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      ComponentListRoutingModule,
      InputTextModule,
      MatGridListModule,
      MatListModule
    ],
    providers: [
        ValidatorService,
        MessageService
    ],
    exports: []
})
export class ComponentListModule {}
