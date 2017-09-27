import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Utils} from '../../models/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    Utils.setupLoginForm();
  }

  displayAuthError() {
    this.error = 'Username or password is incorrect';
    this.loading = false;
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        this.loading = false;
        if (result === true) {
          this.router.navigate(['/home']);
        } else {
          this.displayAuthError();
        }
      }, () => this.displayAuthError());
  }
}
