import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {USER_DATA} from '../constants';
import {BaseService} from './base-service';
import {IUser} from '../models/i-user';
import {ITokenData} from '../models/i-token-data';

import 'rxjs/add/operator/map';
import {ICredentials} from "../models/i-credentials";
import {Observer} from "rxjs/Observer";

@Injectable()
export class AuthenticationService extends BaseService {
  public tokenData: ITokenData;
  public currentUser: IUser;
  public currentAuth: Observable<boolean>;
  private authObserver: Observer<boolean>;

  constructor(private http: Http) {
    super();
    // set token if saved in local storage
    this.tokenData = JSON.parse(localStorage.getItem(USER_DATA));
    this.currentAuth = Observable.create(observer => this.authObserver = observer );
  }

  processCredentials(credentials: ICredentials) {
    this.login(credentials.username, credentials.password)
      .subscribe((result => this.authObserver.next(result)),
        () => this.authObserver.next(false));
  }

  getCurrentUser(): Observable<IUser> {
    const headers = new Headers({ 'X-Auth-Token': this.tokenData.token });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.makeUri('me'), options)
      .map((response: Response) => {
        this.currentUser = response.json() as IUser;
        return this.currentUser;
      });
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(
      this.makeUri('auth'),
      JSON.stringify({ username: username, password: password }),
      this.getPostOptions())
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          const token = response.json() && response.json().token;
          if (token) {
            // set token property
            this.tokenData = { username: username, token: token };

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(USER_DATA, JSON.stringify(this.tokenData));

            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.tokenData = null;
    localStorage.removeItem(USER_DATA);
  }
}
