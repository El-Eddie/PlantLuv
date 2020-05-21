import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareRoutingModule } from './care-routing.module';
import { CareSheetsComponent } from './care-sheets/care-sheets.component';


@NgModule({
  declarations: [CareSheetsComponent],
  imports: [
    CommonModule,
    CareRoutingModule
  ]
})
export class CareModule { }
