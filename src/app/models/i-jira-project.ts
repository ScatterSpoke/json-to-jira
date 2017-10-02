export interface IJiraProject {
  expand: string;
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: { [key: string]: string };
  projectTypeKey: string;
}
