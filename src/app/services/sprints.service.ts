import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {IJiraSprint} from "../models/i-jira-sprint";

@Injectable()
export class SprintsService extends BaseService {

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) {
    super();
  }

  getSprints(rapidViewId: string): Observable<IJiraSprint[]> {
    return this.http.get(
      this.makeUri(`sprints?rapidViewId=${rapidViewId}`),
      this.getPostOptions(this.authenticationService.tokenData.token))
      .map((response: Response) => response.json() as IJiraSprint[]);
  }
}
