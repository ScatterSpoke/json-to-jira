const validateToken = require('./tokens').validateToken;
const buildPromise = require('./utils').buildPromise;

function listProjects(req, res) {
  validateToken(req, res).then((jiraClient)=> {
    buildPromise((c)=> jiraClient.listProjects(c)).then((results) => {
      res.json(results);
    });
  });
}

module.exports = {
  listProjects: listProjects,
};
