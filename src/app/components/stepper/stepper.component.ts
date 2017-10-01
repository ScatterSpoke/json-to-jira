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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.issuesFormGroup = this._formBuilder.group({
    });
    this.loginFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
