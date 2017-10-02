import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

import {AuthenticationService} from "./authentication.service";
import {BaseService} from "./base-service";
import {Observable} from "rxjs/Observable";
import {Issue} from "../models/issue";
import {IIssueBatch} from "../models/i-issue-batch";
import {Observer} from "rxjs/Observer";
import {IJiraIssue} from "../models/i-jira-issue";

@Injectable()
export class IssuesService extends BaseService {
  currentIssues: Issue[];
  public currentBatch: Observable<IJiraIssue[]>;
  public processingBatch: boolean;
  private batchObserver: Observer<IJiraIssue[]>;

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) {
    super();
    this.currentBatch = Observable.create(observer => this.batchObserver = observer );
  }

  processBatch(issueBatch: IIssueBatch) {
    this.processingBatch = true;
    this.createBatch(issueBatch)
      .subscribe(result => {
          this.processingBatch = false;
          this.batchObserver.next(result);
      },
        () => this.processingBatch = false);
  }

  createBatch(issueBatch: IIssueBatch): Observable<IJiraIssue[]> {
    return this.http.post(
      this.makeUri('issues/batch'),
      JSON.stringify(issueBatch),
      this.getPostOptions(this.authenticationService.tokenData.token))
      .map((response: Response) => response.json() as any[]);
  }

}
