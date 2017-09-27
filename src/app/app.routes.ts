/**
 * Created by kopz9 on 4/13/2017.
 */

import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";

// Route Configuration
export const router: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
