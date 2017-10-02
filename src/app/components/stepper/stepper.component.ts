import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = true;
  issuesFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  projectsFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.issuesFormGroup = this._formBuilder.group({
    });
    this.loginFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.projectsFormGroup = this._formBuilder.group({
      projectId: ['', Validators.required],
      issueTypeId: ['', Validators.required],
      rapidViewId: ['', Validators.required],
      sprintId: ['', Validators.required]
    });
  }
}
