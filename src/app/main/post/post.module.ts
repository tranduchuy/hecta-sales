import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { AddEditRentPostComponent } from './add-edit-rent-post/add-edit-rent-post.component';
import {DatePickerModule} from '../../shared/components/date-picker/date-picker.module';
import {InputTextModule} from '../../shared/components/input-text/input-text.module';
import {ComboBoxModule} from '../../shared/components/combo-box/combo-box.module';
import {CheckboxGroupModule} from '../../shared/components/checkbox-group/checkbox-group.module';
import {ImageUploaderModule} from '../../shared/components/image-uploader/image-uploader.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectTextModule} from '../../shared/components/select-text/select-text.module';
import {InputTextareaModule} from '../../shared/components/input-textarea/input-textarea.module';
import {InputNumberModule} from '../../shared/components/input-number/input-number.module';
import {ButtonModule} from '../../shared/components/button/button.module';
import {MatDividerModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {CaptchaModule} from '../../shared/components/captcha/captcha.module';
import { ListSalePostComponent } from './list-sale-post/list-sale-post.component';
import {
  MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {HelperService} from '../../shared/services/helper.service';
import {AppStaticImageModule} from '../../shared/pipes/app-static-image-pipe/app-static-image.module';
import {DialogService} from '../../shared/components/dialog/dialog.service';
import { AddEditSalePostComponent } from './add-edit-sale-post/add-edit-sale-post.component';
import {MapModule} from '../../shared/components/map/map.module';
import {RadioGroupModule} from '../../shared/components/radio-group/radio-group.module';
@NgModule({
  declarations: [AddEditRentPostComponent, ListSalePostComponent, AddEditSalePostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    DatePickerModule,
    InputTextModule,
    ComboBoxModule,
    CheckboxGroupModule,
    ImageUploaderModule,
    SelectTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    CaptchaModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    FuseSharedModule,
    FuseWidgetModule,
    AppStaticImageModule,
    RadioGroupModule,
    MapModule
  ],
  providers: [
    HelperService,
    DialogService
  ]
})
export class PostModule { }
