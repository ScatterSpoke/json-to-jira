import {Issue} from "./issue";

export interface IIssueBatch {
  projectId: string;
  issueTypeId: string;
  rapidViewId: string;
  sprintId: string;
  issues: Issue[];
}
