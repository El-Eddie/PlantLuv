import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { Routes, RouterModule, ROUTES, Router } from '@angular/router';

import { AppComponent } from './app.component';

import { SharedImportsModule } from './shared/shared-imports.module';
import { IconService } from './shared/icon.service'

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './account/jwt.interceptor';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker'


//const routes: Routes = [
// {
//   path: 'dashboard',
//    loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
//  },
//  {
//    path: '**',
//    redirectTo: 'dashboard'
//  }
//];


@NgModule({
  declarations: [
    AppComponent,
    NavLinksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedImportsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'PlantLuv app Detools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    //Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    IconService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor( iconService: IconService) {}
}
