import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedImportsModule } from './shared/shared-imports.module';

import { FilterComponent } from './filter/filter.component'


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'caresheets',
    loadChildren: () => import('./care/care.module').then(m => m.CareModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    BrowserAnimationsModule,
    SharedImportsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
