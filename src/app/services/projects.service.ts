import { Injectable } from '@angular/core';
import {BaseService} from './base-service';
import {Http, Response} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import {IJiraProject} from '../models/i-jira-project';

@Injectable()
export class ProjectsService extends BaseService {

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) {
    super();
  }

  getProjects(): Observable<IJiraProject[]> {
    return this.http.get(
      this.makeUri('projects'),
      this.getPostOptions(this.authenticationService.tokenData.token))
      .map((response: Response) => response.json() as IJiraProject[]);
  }
}
