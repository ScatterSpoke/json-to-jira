import { Injectable } from '@angular/core';
import {BaseService} from "./base-service";
import {AuthenticationService} from "./authentication.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {IJiraIssueType} from "../models/i-jira-issue-type";

@Injectable()
export class IssueTypesService extends BaseService {

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) {
    super();
  }

  getIssueTypes(): Observable<IJiraIssueType[]> {
    return this.http.get(
      this.makeUri('issue_types'),
      this.getPostOptions(this.authenticationService.tokenData.token))
      .map((response: Response) => response.json() as IJiraIssueType[]);
  }
}
