import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

import {AuthenticationService} from "./authentication.service";
import {BaseService} from "./base-service";
import {Observable} from "rxjs/Observable";
import {Issue} from "../models/issue";

@Injectable()
export class IssuesService extends BaseService {
  currentIssues: Issue[];

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) {
    super();
  }

  createBatch(issues: Issue[]): Observable<any[]> {
    return this.http.post(
      this.makeUri('issues/batch'),
      JSON.stringify({ issues }),
      this.getPostOptions(this.authenticationService.tokenData.token))
      .map((response: Response) => response.json() as any[]);
  }

}
