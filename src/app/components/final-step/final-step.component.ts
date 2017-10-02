import { Component, OnInit } from '@angular/core';
import {IssuesService} from "../../services/issues.service";
import {IJiraIssue} from "../../models/i-jira-issue";

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss']
})
export class FinalStepComponent implements OnInit {
  issues: IJiraIssue[] = [];

  constructor(
    public issuesService: IssuesService
  ) {
    this.issuesService.currentBatch.subscribe((issues) => this.issues = issues);
  }

  ngOnInit() {
  }

}
