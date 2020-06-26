import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PlantService } from './service/plant.service';
import { MockPlantService } from './service/z_mock-plant.service';
import { PlantTypeService } from './service/plant-type.service'
import { MockPlantTypeService } from './service/z_mock-plant-type.service'

import { SharedImportsModule } from  '../shared/shared-imports.module'
import { environment } from '../../environments/environment';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PlantCardComponent } from './plant-list-card/plant-card.component';

import { TypeListCardComponent } from './type-list-card/type-list-card.component';
import { TypeDetailsComponent } from './type-details/type-details.component';

import { StoreModule} from '@ngrx/store'
import { displayReducer } from '../store/nav-state'

import { FavoritePipe } from './pipes/favorite.pipe';
import { NotificationPipe } from './pipes/notification.pipe';
import { LightLevelPipe } from './pipes/light-level.pipe';
import { ToxisityPipe } from './pipes/toxisity.pipe';

import { FilterComponent } from './filter/filter.component';

import { DeleteDialogComponent } from './pop-up/delete-dialog.component';
import { ConfirmationSnackbarComponent } from './pop-up/confirmation-snackbar.component';
import { RenameDialogComponent } from './pop-up/rename-dialog.component';
import { TypeDashboardComponent } from './type-dashboard/type-dashboard.component';
import { AddPlantComponent } from './add-plant/add-plant.component';

const routes: Routes = [
  {
    path: 'user-plants',
    component: UserDashboardComponent
  },
  {
    path: 'care-sheets',
    component: TypeDashboardComponent
  },
  {
    path: '',
    redirectTo: 'user-plants'
  }
]

@NgModule({
  declarations: [
    UserDashboardComponent,
    PlantCardComponent,

    TypeListCardComponent,
    TypeDetailsComponent,

    LightLevelPipe,
    ToxisityPipe,
    FavoritePipe,
    NotificationPipe,

    FilterComponent,
    DeleteDialogComponent,
    RenameDialogComponent,
    ConfirmationSnackbarComponent,
    TypeDashboardComponent,
    AddPlantComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    SharedImportsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('page', displayReducer)
  ],
  providers: [
    {
      provide: PlantService,
      useClass: environment.production ? PlantService : MockPlantService
    },
    {
      provide: PlantTypeService,
      useClass: environment.production ? PlantTypeService : MockPlantTypeService
    }
  ],
})
export class UserDashboardModule { }
