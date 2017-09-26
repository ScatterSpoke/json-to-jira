/**
 * Created by kopz9 on 4/13/2017.
 */

import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";

// Route Configuration
export const router: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard, TokenGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [FirebaseGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
