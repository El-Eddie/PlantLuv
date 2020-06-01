import { BrowserModule, Title} from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedImportsModule } from './shared/shared-imports.module';

import { FilterComponent } from './filter/filter.component';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'care',
    loadChildren: () => import('./care/care.module').then(m => m.CareModule)
  },
  {
    path: '**',
    // redirectTo: 'care'
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
    BrowserAnimationsModule,
    SharedImportsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
