import { NgModule } from '@angular/core';
import { ComponentListComponent } from './component-list.component';
import { CommonModule } from '@angular/common';
import { ComponentListRoutingModule } from './component-list-routing.module';
import { InputTextModule } from '../input-text/input-text.module';
import { MatGridListModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    exports: []
})
export class ComponentListModule {}
