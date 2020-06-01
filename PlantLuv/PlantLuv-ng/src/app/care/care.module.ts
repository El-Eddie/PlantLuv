import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { CareRoutingModule } from './care-routing.module';
import { PlantTypeService } from './plant-type.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MockPlantTypeService } from './-mock-plant-type.service';

import { SharedImportsModule } from '../shared/shared-imports.module';

import { TypeDetailsComponent } from './type-details/type-details.component';
import { TypeDashboardComponent } from './type-dashboard/type-dashboard.component'
import { TypeListCardComponent } from './type-list-card/type-list-card.component'

@NgModule({
  declarations: [
    TypeDashboardComponent,
    TypeListCardComponent,
    TypeDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CareRoutingModule,
    SharedImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: PlantTypeService,
      useClass: environment.production ? PlantTypeService : MockPlantTypeService
    }
  ],
})
export class CareModule { }
