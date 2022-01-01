import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActsPageComponent } from './acts-page/acts-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPageComponent } from './reset-page/reset-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { TechLayoutComponent } from './shared/layouts/tech-layout/tech-layout.component';
import { TechPageComponent } from './tech-page/tech-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'reset', component: ResetPageComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'tech', pathMatch: 'full' },
      {
        path: '',
        component: TechLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'tech', component: TechPageComponent },
          // { path: 'tech', component: TechPageComponent },
        ],
      },
      {
        path: 'acts',
        component: ActsPageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
