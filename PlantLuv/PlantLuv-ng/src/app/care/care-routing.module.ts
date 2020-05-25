import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeListComponent } from './type-list/type-list.component';


const routes: Routes = [
  {
    path: '',
    component: TypeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareRoutingModule { }
