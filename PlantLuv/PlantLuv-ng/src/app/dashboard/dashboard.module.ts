import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlantService } from './plant.service';
import { MockPlantService } from './-mock-plant.service';
import { SharedImportsModule } from  '../shared/shared-imports.module'
import { environment } from '../../environments/environment';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PlantCardComponent } from './plant-list-card/plant-card.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    PlantCardComponent,
    PlantDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    SharedImportsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: PlantService,
      useClass: environment.production ? PlantService : MockPlantService
    }
  ],
})
export class DashboardModule { }
