import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Issue} from "../../models/issue";
import {FormGroup, NgForm} from "@angular/forms";
import {MdSnackBar} from "@angular/material";
import {IssuesService} from "../../services/issues.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Input() formGroup: FormGroup;
  model: Issue = new Issue();
  issues: Issue[] = [];

  constructor(
    public issuesService: IssuesService,
  ) { }

  ngOnInit() {
  }

  addIssue() {
    this.issues.push(this.model);
    this.model = new Issue();
    this.form.resetForm();
  }

  remove(issue: Issue) {
    const idx = this.issues.indexOf(issue);
    this.issues.splice(idx, 1);
  }

  exportToJira() {
    this.issuesService.currentIssues = this.issues;
  }

  exportToTrello() {
    console.log('exporting to Trello');
  }
}
