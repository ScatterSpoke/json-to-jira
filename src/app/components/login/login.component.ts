import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Utils} from '../../models/utils';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ICredentials} from "../../models/i-credentials";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  @Input() formGroup: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  displayAuthError() {
    this.error = 'Username or password is incorrect';
    this.loading = false;
  }

  login(e) {
    this.loading = true;
    this.authenticationService.processCredentials(this.formGroup.value as ICredentials);
  }
}
