const config = require('./jiraConfig.json');
const JiraApi = require('jira').JiraApi;

function jiraErrorHandler(err, res) {
  res.status(400).json({ message: err });
}

/**
 * @return {JiraApi}
 */
function getJiraClient(username, password, version = '2') {
  return new JiraApi('https', config.host, config.port, username, password, version);
}

module.exports = {
  jiraErrorHandler: jiraErrorHandler,
  getJiraClient: getJiraClient,
};
