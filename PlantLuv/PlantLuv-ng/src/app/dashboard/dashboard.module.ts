import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PlantService } from './service/plant.service';
import { MockPlantService } from './service/z_mock-plant.service';
import { PlantTypeService } from './service/plant-type.service'
import { MockPlantTypeService } from './service/z_mock-plant-type.service'

import { SharedImportsModule } from '../shared/shared-imports.module'
import { environment } from '../../environments/environment';


import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPlantCardComponent } from './user-plant-card/user-plant-card.component';

import { PlantCardComponent } from './plant-type-card/plant-type-card.component';
import { PlantDetailsComponent } from './plant-type-details/plant-type-details.component';

import { StoreModule } from '@ngrx/store'
import { displayReducer } from '../store/nav-state'
// Icon Pipes
import { FavoritePipe } from './pipes/favorite.pipe';
import { NotificationPipe } from './pipes/notification.pipe';
import { LightLevelPipe } from './pipes/light-level.pipe';
import { ToxisityPipe } from './pipes/toxisity.pipe';
import { DifficultyPipe } from './pipes/difficulty.pipe'
// Fitler
import { FilterComponent } from './filter/filter.component';
// Plant cards
import { DeleteDialogComponent } from './pop-up/delete-dialog.component';
import { ConfirmationSnackbarComponent } from './pop-up/confirmation-snackbar.component';
import { RenameDialogComponent } from './pop-up/rename-dialog.component';
import { PlantTypeDashboardComponent } from './plant-type-dashboard/plant-type-dashboard.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { UserDashboardRoutingModule } from './dashboard.routing';

@NgModule({
  declarations: [
    UserDashboardComponent,
    PlantCardComponent,
    UserPlantCardComponent,
    PlantDetailsComponent,

    // Icon Pipes
    LightLevelPipe,
    ToxisityPipe,
    FavoritePipe,
    NotificationPipe,
    DifficultyPipe,

    FilterComponent,
    DeleteDialogComponent,
    RenameDialogComponent,
    ConfirmationSnackbarComponent,
    PlantTypeDashboardComponent,
    AddPlantComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    SharedImportsModule,
    UserDashboardRoutingModule,
    StoreModule.forFeature('page', displayReducer)
  ],
  providers: [
    PlantService,
    // {
    //   provide: PlantService,
    //   useClass: environment.production ? PlantService : MockPlantService
    // },
    {
      provide: PlantTypeService,
      useClass: environment.production ? PlantTypeService : MockPlantTypeService
    }
  ],
})

export class UserDashboardModule { }
