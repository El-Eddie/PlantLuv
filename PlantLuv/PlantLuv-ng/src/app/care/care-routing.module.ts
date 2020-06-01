import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeDashboardComponent } from './type-dashboard/type-dashboard.component';
import { TypeDetailsComponent } from './type-details/type-details.component';


const routes: Routes = [
  {
    path: '',
    component: TypeDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareRoutingModule { }
