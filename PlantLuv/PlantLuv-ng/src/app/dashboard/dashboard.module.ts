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
// Filter
import { FilterComponent } from './filter/filter.component';
// Plant cards
import { DeleteDialogComponent } from '../dashboard/pop-up/delete-dialog.component';
import { ConfirmationSnackbarComponent } from '../dashboard/pop-up/confirmation-snackbar.component';
import { RenameDialogComponent } from '../dashboard/pop-up/rename-dialog.component';
import { PlantTypeDashboardComponent } from './plant-type-dashboard/plant-type-dashboard.component';
import { AddPlantComponent } from './user-add-new-plant/user-add-new-plant.component';
import { UserDashboardRoutingModule } from './dashboard.routing';
import { PlantTypeAddNewComponent } from './plant-type-add-new-plant/plant-type-add-new-plant.component';
import { MarkdownModule } from 'ngx-markdown';

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
    AddPlantComponent,
    PlantTypeAddNewComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    SharedImportsModule,
    MarkdownModule,
    UserDashboardRoutingModule,
    StoreModule.forFeature('page', displayReducer)
  ],
  providers: [
    PlantService,
    PlantTypeService
    // {
    //   provide: PlantService,
    //   useClass: environment.production ? PlantService : MockPlantService
    // },
    // {
    //   provide: PlantTypeService,
    //   useClass: environment.production ? PlantTypeService : MockPlantTypeService
    // }
  ],
})

export class UserDashboardModule { }
