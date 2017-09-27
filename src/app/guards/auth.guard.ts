import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {USER_DATA} from '../constants';
import {IUser} from '../models/i-user';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  redirectToLogin(): boolean {
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): boolean | Observable<boolean> {
    if (localStorage.getItem(USER_DATA)) {
      // logged in so return true
      return this.authenticationService.getCurrentUser()
        .map((user: IUser) => {
          if (user === null) {
            return this.redirectToLogin();
          } else {
            return true;
          }
        })
        .catch(() => Observable.of(this.redirectToLogin()));
    }
    this.redirectToLogin();
  }
}
