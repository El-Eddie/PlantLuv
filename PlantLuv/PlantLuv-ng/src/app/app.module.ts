import { BrowserModule, Title} from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedImportsModule } from './shared/shared-imports.module';
import { IconService } from './shared/icon.service'


import { HttpClientModule } from '@angular/common/http';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NavLinksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedImportsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'PlantLuv app Detools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    iconService: IconService
  )
  {}
}
