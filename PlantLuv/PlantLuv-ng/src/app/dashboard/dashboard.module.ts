import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PlantService } from './plant.service';
import { MockPlantService } from './-mock-plant.service';
import { SharedImportsModule } from  '../shared/shared-imports.module'
import { environment } from '../../environments/environment';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PlantDashboardComponent } from './plant-dashboard/plant-dashboard.component';
import { PlantCardComponent } from './plant-list-card/plant-card.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

import { FavoritePipe } from './pipes/favorite.pipe';
import { NotificationPipe } from './pipes/notification.pipe';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ConfirmationSnackbarComponent } from './confirmation-snackbar.component';

@NgModule({
  declarations: [
    PlantDashboardComponent,
    PlantCardComponent,
    PlantDetailsComponent,
    FavoritePipe,
    NotificationPipe,
    DeleteDialogComponent,
    ConfirmationSnackbarComponent,
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
