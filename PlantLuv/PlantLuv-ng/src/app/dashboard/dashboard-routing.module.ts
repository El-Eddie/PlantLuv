import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent
  },
  {
    path: 'plant/:id',
    component: PlantDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
