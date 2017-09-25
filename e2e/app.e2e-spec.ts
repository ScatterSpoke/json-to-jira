import { JsonToJiraPage } from './app.po';

describe('json-to-jira App', () => {
  let page: JsonToJiraPage;

  beforeEach(() => {
    page = new JsonToJiraPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
