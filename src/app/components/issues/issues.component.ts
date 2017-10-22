import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {Issue} from "../../models/issue";
import {FormGroup, NgForm} from "@angular/forms";
import {MdSnackBar} from "@angular/material";
import {IssuesService} from "../../services/issues.service";
import {StepperComponent} from "../stepper/stepper.component";
import {ProjectPlatformService} from "../../services/project-platform.service";
import {TrelloClientService} from "../../services/trello-client.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Input() formGroup: FormGroup;
  @Input() stepperComponent: StepperComponent;
  model: Issue = new Issue();
  issues: Issue[] = [];

  constructor(
    public issuesService: IssuesService,
    public trelloClientService: TrelloClientService,
    public projectPlatformService: ProjectPlatformService,
    private zone: NgZone
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
    this.projectPlatformService.setJira();
    this.issuesService.currentIssues = this.issues;
  }

  exportToTrello() {
    this.issuesService.currentIssues = this.issues;
    this.trelloClientService.authorize().then((t) => {
      this.stepperComponent.loginFormGroup.setValue({username: 'user', password: 'password'});
      this.stepperComponent.mdStepper.selectedIndex = 2;
      this.projectPlatformService.setTrello();
    }).catch((err) => {
      console.log(err);
    });
  }
}
