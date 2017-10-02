const validateToken = require('./tokens').validateToken;
const buildPromise = require('./utils').buildPromise;

function listIssueTypes(req, res) {
  validateToken(req, res).then((jiraClient)=> {
    buildPromise((c)=> jiraClient.listIssueTypes(c)).then((results) => {
      res.json(results);
    });
  });
}

module.exports = {
  listIssueTypes: listIssueTypes,
};
