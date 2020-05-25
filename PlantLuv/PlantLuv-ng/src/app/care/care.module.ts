import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { CareRoutingModule } from './care-routing.module';
import { PlantTypeService } from './plant-type.service';
import { HttpClientModule } from '@angular/common/http';

import { MockPlantTypeService } from './-mock-plant-type.service';

import { TypeListComponent } from './type-list/type-list.component';
import { TypeCardComponent } from './type-card/type-card.component';
import { SharedImportsModule } from '../shared/shared-imports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TypeListComponent,
    TypeCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CareRoutingModule,
    SharedImportsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: PlantTypeService,
      useClass: environment.production ? PlantTypeService : MockPlantTypeService
    }
  ],
})
export class CareModule { }
