import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {IJiraRapidView} from "../models/i-jira-rapid-view";

@Injectable()
export class RapidViewsService extends BaseService {

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) {
    super();
  }

  getRapidViews(): Observable<IJiraRapidView[]> {
    return this.http.get(
      this.makeUri('rapid_views'),
      this.getPostOptions(this.authenticationService.tokenData.token))
      .map((response: Response) => response.json() as IJiraRapidView[]);
  }
}
