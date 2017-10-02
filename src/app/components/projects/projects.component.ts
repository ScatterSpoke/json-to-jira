import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {MdButton} from '@angular/material/button';
import {ProjectsService} from "../../services/projects.service";
import {Subscription} from "rxjs/Subscription";
import {IssueTypesService} from "../../services/issue-types.service";
import {RapidViewsService} from "../../services/rapid-views.service";
import {SprintsService} from "../../services/sprints.service";
import {IJiraProject} from "../../models/i-jira-project";
import {IJiraIssueType} from "../../models/i-jira-issue-type";
import {IJiraSprint} from "../../models/i-jira-sprint";
import {IJiraRapidView} from "../../models/i-jira-rapid-view";

import 'rxjs/add/operator/toPromise';
import {IssuesService} from "../../services/issues.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @ViewChild('backButton') backButton: MdButton;
  authorized = false;
  subscriptions: Subscription[] = [];
  projects: IJiraProject[] = [];
  issueTypes: IJiraIssueType[] = [];
  rapidViews: IJiraRapidView[] = [];
  sprints: IJiraSprint[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private projectsService: ProjectsService,
    private issueTypesService: IssueTypesService,
    private rapidViewsService: RapidViewsService,
    private sprintsService: SprintsService,
    private issuesService: IssuesService,
  ) { }

  ngOnInit() {
    this.authenticationService.currentAuth.subscribe((result) => {
      this.authorized = result;
      if (result) {
        this.retrieveData();
      } else {
        this.backButton._elementRef.nativeElement.click();
      }
    });
  }

  submit() {
    this.issuesService.processBatch({
      ...this.formGroup.value,
      issues: this.issuesService.currentIssues,
    });
  }

  public onRapidViewSelect() {
    this.sprintsService.getSprints(this.formGroup.value.rapidViewId).toPromise()
      .then( (sprints) => this.sprints = sprints );
  }

  public onBack() {
    let sub: Subscription = null;
    while ((sub = this.subscriptions.pop()) != null) {
      sub.unsubscribe();
    }
  }

  private retrieveData() {
    const projectSub = this.projectsService.getProjects()
      .subscribe((projects) => this.projects = projects );
    const issueTypeSub = this.issueTypesService.getIssueTypes()
      .subscribe((issueTypes) => this.issueTypes = issueTypes );
    const rapidViewSub = this.rapidViewsService.getRapidViews()
      .subscribe((rapidViews) => this.rapidViews = rapidViews );
    this.subscriptions.push(projectSub, issueTypeSub, rapidViewSub);
  }
}
