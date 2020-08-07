import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantDashboardComponent } from './plant-dashboard/plant-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthenticatedGuard } from '../account/authenticated.guard';

const routes: Routes = [
  {
    path: 'user-plants',
    pathMatch: 'full',
    component: UserDashboardComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'care-sheets',
    pathMatch: 'full',
    component: PlantDashboardComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-plants',
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
