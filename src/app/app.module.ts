import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from '@angular/material';
import {
  MdButtonModule, MdCardModule, MdMenuModule,
  MdToolbarModule, MdIconModule, MatProgressSpinnerModule,
  MatButtonModule, MatInputModule, MatIconModule, MatListModule,
  MatSnackBarModule, MatStepperModule
} from '@angular/material';

import 'hammerjs';
import { routes } from './app.routes';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssuesService } from './services/issues.service';
import { StepperComponent } from './components/stepper/stepper.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    IssuesComponent,
    StepperComponent,
    ProjectsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule, // Add material components to imports array
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    routes,
  ],
  providers: [
    AuthenticationService,
    IssuesService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
