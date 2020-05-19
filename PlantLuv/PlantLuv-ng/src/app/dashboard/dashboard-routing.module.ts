import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component:UserDashboardComponent
  },
  {
    path: 'plant/:id',
    component: PlantDetailsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: UserDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
