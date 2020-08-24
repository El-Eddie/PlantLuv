import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantTypeDashboardComponent } from './plant-type-dashboard/plant-type-dashboard.component';
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
    path: 'browse-plants',
    pathMatch: 'full',
    component: PlantTypeDashboardComponent,
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
