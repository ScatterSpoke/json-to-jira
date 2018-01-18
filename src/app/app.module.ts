import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from '@angular/material';
import {
  MatCardModule, MatMenuModule,
  MatToolbarModule, MatProgressSpinnerModule,
  MatButtonModule, MatInputModule, MatIconModule, MatListModule,
  MatSnackBarModule, MatStepperModule, MatSelectModule
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
import { FinalStepComponent } from './components/final-step/final-step.component';
import {ProjectsService} from './services/projects.service';
import {IssueTypesService} from './services/issue-types.service';
import {RapidViewsService} from './services/rapid-views.service';
import {SprintsService} from './services/sprints.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    IssuesComponent,
    StepperComponent,
    ProjectsComponent,
    FinalStepComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule, // Add material components to imports array
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    routes,
  ],
  providers: [
    AuthenticationService,
    IssuesService,
    AuthGuard,
    ProjectsService,
    IssueTypesService,
    RapidViewsService,
    SprintsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
