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
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker'



@NgModule({
  declarations: [
    AppComponent,
    NavLinksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedImportsModule,
    AccountModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'PlantLuv App',
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
