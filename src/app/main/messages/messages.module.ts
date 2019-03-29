import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from '../../shared/components/date-picker/date-picker.module';
import { InputTextModule } from '../../shared/components/input-text/input-text.module';
import { ComboBoxModule } from '../../shared/components/combo-box/combo-box.module';
import { MatExpansionModule, MatFormFieldModule, MatButtonModule, MatListModule, MatLineModule, MatDialogModule, MatSelectModule, MatIconModule, MatCardModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { InputPasswordModule } from 'app/shared/components/input-password/input-password.module';
import { RadioGroupModule } from 'app/shared/components/radio-group/radio-group.module';
import { FuseSharedModule } from '@fuse/shared.module';
@NgModule({
    declarations: [MessagesComponent],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MessagesRoutingModule,
        ComboBoxModule,
        InputTextModule,
        InputPasswordModule,
        DatePickerModule,
        RadioGroupModule,
        MatButtonModule,
        MatListModule,
        MatLineModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        FuseSharedModule,
        MatTableModule,
        MatPaginatorModule,

    ]
})
export class MessagesModule { }
