import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ProjectPlatformService} from "../../services/project-platform.service";

@Component({
  selector: 'app-projects-wrapper',
  templateUrl: './projects-wrapper.component.html',
  styleUrls: ['./projects-wrapper.component.scss']
})
export class ProjectsWrapperComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor(
    public projectPlatformService: ProjectPlatformService
  ) { }

  ngOnInit() {
  }

}
