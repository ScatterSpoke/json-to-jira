import { Injectable } from '@angular/core';
import {ProjectPlatform} from "../models/project-platform.enum";

@Injectable()
export class ProjectPlatformService {
  current: ProjectPlatform;

  constructor() { }

  setJira() {
    this.current = ProjectPlatform.Jira;
  }

  setTrello() {
    this.current = ProjectPlatform.Trello;
  }

  isJira(): boolean {
    return this.current === ProjectPlatform.Jira;
  }

  isTrello(): boolean {
    return this.current === ProjectPlatform.Trello;
  }
}
