const config = require('./jiraConfig.json');
const JiraApi = require('jira').JiraApi;

JiraApi.prototype.listSprints = function (rapidViewId, callback) {
  var options = {
    rejectUnauthorized: this.strictSSL,
    uri: this.makeUri('/sprintquery/' + rapidViewId, 'rest/greenhopper/'),
    method: 'GET',
    json:true
  };

  this.doRequest(options, function(error, response) {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 404) {
      callback('Invalid URL');
      return;
    }

    if (response.statusCode !== 200) {
      callback(response.statusCode + ': Unable to connect to JIRA during sprints search.');
      return;
    }

    if (response.body !== null) {
      callback(null, response.body.sprints);
      return;
    }

  });
};

JiraApi.prototype.listRapidViews = function(callback) {
  var options = {
    rejectUnauthorized: this.strictSSL,
    uri: this.makeUri('/rapidviews/list', 'rest/greenhopper/'),
    method: 'GET',
    json: true
  };

  this.doRequest(options, function(error, response) {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 404) {
      callback('Invalid URL');
      return;
    }

    if (response.statusCode !== 200) {
      callback(response.statusCode + ': Unable to connect to JIRA during rapidView search.');
      return;
    }

    callback(null, response.body.views);
  });
};

JiraApi.prototype.addIssueToSprint = function(issueId, sprintId, callback) {
  var options = {
    rejectUnauthorized: this.strictSSL,
    uri: this.makeUri('/sprint/' + sprintId + '/issue', 'rest/agile/'),
    method: 'POST',
    followAllRedirects: true,
    json:true,
    body: {
      issues: [issueId]
    }
  };

  this.doRequest(options, function(error, response) {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 404) {
      callback('Invalid URL');
      return;
    }

    if (response.statusCode !== 204) {
      callback(response.statusCode + ': Unable to connect to JIRA to add to sprint.');
      return;
    }
  });
};

function jiraErrorHandler(err, res) {
  res.status(400).json({ message: err });
}

/**
 * @return {JiraApi}
 */
function getJiraClient(username, password, version) {
  return new JiraApi('https', config.host, config.port, username, password, version);
}

module.exports = {
  jiraErrorHandler: jiraErrorHandler,
  getJiraClient: getJiraClient,
};
