import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ResetPageComponent } from './reset-page/reset-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';

import { TechLayoutComponent } from './shared/layouts/tech-layout/tech-layout.component';
import { TechPageComponent } from './tech-page/tech-page.component';
import { ActsPageComponent } from './acts-page/acts-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

import { MaterialModule } from './material.module';
import { TechFormComponent } from './tech-page/tech-form/tech-form.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { CollectionsFormComponent } from './collections-page/collections-form/collections-form.component';

@NgModule({
  imports: [BrowserModule, CommonModule, AppRoutingModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, HttpClientModule, MaterialModule],
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    ResetPageComponent,
    TechLayoutComponent,
    TechPageComponent,
    ActsPageComponent,
    OverviewPageComponent,
    TechFormComponent,
    CollectionsPageComponent,
    CollectionsPageComponent,
    CollectionsFormComponent,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
