import {Component, OnInit, ViewChild} from '@angular/core';
import {Issue} from "../../models/issue";
import {NgForm} from "@angular/forms";
import {MdSnackBar} from "@angular/material";
import {IssuesService} from "../../services/issues.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  model: Issue = new Issue();
  issues: Issue[] = [];
  exporting: boolean = false;

  constructor(
    public snackBar: MdSnackBar,
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
    this.exporting = true;
    this.issuesService.createBatch(this.issues).subscribe(() => {
      this.finishExportToJira();
      this.snackBar.open('Exported to JIRA', 'Close', {
        duration: 2000,
      });
    }, () => {
      this.finishExportToJira();
      this.snackBar.open('Error sending to JIRA', 'Close', {
        duration: 2000,
      });
    });
  }

  private finishExportToJira() {
    this.issues.splice(0, this.issues.length);
    this.exporting = false;
  }
}
