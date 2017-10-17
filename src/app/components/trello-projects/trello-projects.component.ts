import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ITrelloBoard} from '../../models/i-trello-board';
import {ITrelloList} from '../../models/i-trello-list';
import {TrelloClientService} from "../../services/trello-client.service";
import {IssuesService} from "../../services/issues.service";

@Component({
  selector: 'app-trello-projects',
  templateUrl: './trello-projects.component.html',
  styleUrls: ['./trello-projects.component.scss']
})
export class TrelloProjectsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  boards: ITrelloBoard[] = [];
  lists: ITrelloList[] = [];

  constructor(
    public trelloClientService: TrelloClientService,
    public issuesService: IssuesService
  ) { }

  ngOnInit() {
    this.trelloClientService.getBoards().then((data) => {
      this.boards = data;
    });
  }

  public onBoardSelect() {
    this.trelloClientService.getLists(this.formGroup.value.projectId)
      .then( (lists) => this.lists = lists );
  }

  submit() {
    this.issuesService.currentIssues.forEach((issue) => {
      this.trelloClientService.createCard({
        name: issue.text,
        desc: issue.text,
        idList: this.formGroup.value.issueTypeId,
        pos: 'top'
      });
    });
  }
}
